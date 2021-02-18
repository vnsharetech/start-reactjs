import Resizer from "react-image-file-resizer";
import { LOCAL_GATEWAY } from "config";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { locationService, inspectionService } from "services";
import { filter, map, concat } from "lodash";
import uuid from "uuid";
import Config from "config";

export const arrayBufferToBlob = (buffer, type) => {
  return new Blob([buffer], { type: type });
};

export const createObjectURL = (file) => {
  return URL.createObjectURL(arrayBufferToBlob(file.data, file.type));
};

export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    // reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file);
  });
};

export const mapFilesAsync = (files) => {
  let promises = [];

  for (let i = 0; i < files.length; i++) {
    const resized = resizerImage(files[i]).then((blob) => readFileAsync(blob));
    promises.push(resized);
  }

  return Promise.all(promises);
};

export const resizerImage = (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      "JPEG",
      80,
      0,
      (blob) => {
        resolve(blob);
      },
      "blob",
    );
  });
};

export const makeDataUploadS3 = (files, s3_path) => {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const { data, type, name } = files[i];

    //handle image or file document
    if (type.includes("image/")) {
      const blob = arrayBufferToBlob(data, type);
      formData.append("files", blob, name);
    } else {
      formData.append("files", data);
    }
  }

  formData.append("path", s3_path);

  return formData;
};

export const getLinkFile = (link) => {
  if (!link) return "";
  return link.includes("https://") ? link : LOCAL_GATEWAY + link;
};

export const downloadAllDocument = async (files) => {
  const zip = new JSZip();
  let array = [];

  const getFile = async (file) => {
    const { name, mime } = file;
    const typeJpeg = "jpeg";
    const fileName =
      mime.includes("image/jpeg") && name.split(".").pop() !== typeJpeg
        ? `${name}.${typeJpeg}`
        : name;

    await locationService.downloadFile(file._id).then((data) => {
      zip.file(fileName, data, { binary: true });
    });
  };

  files.forEach((file) => {
    if (file) {
      array.push(getFile(file));
    }
  });
  await Promise.all(array).then(() => {
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, "archive.zip");
    });
  });
};

export const uploadImages = (images) => {
  try {
    let formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      const { data, type } = images[i];
      const blob = arrayBufferToBlob(data, type);
      formData.append("files", blob, uuid());
    }

    formData.append("path", Config.S3_IMAGE_PATH);
    const resp = inspectionService.uploadImage(formData);
    return resp;
  } catch (error) {}
};

export const repairUploadFileInspection = async (inspectionData) => {
  let { inspectionItems } = inspectionData;

  // handle upload images
  for (let i in inspectionItems) {
    let { images } = inspectionItems[i];
    let imagesUploaded = [];
    images = images || [];
    let imagesUpload = filter(images, (item) => item.data && item.type);

    if (imagesUpload && imagesUpload.length) {
      imagesUploaded = await uploadImages(imagesUpload);
      inspectionItems[i].images = concat(
        filter(images, (item) => !item.data),
        map(imagesUploaded, (item) => item.url),
      );
    }
  }

  return inspectionData;
};
