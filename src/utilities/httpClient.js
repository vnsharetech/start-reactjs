import __ from "lodash";
import qs from "qs";
import AxiosInstance from "./interceptor";

const internals = {};

internals.get = (url, params, options) => {
  let config = {
    method: "GET",
    url: url,
    params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  };
  config = Object.assign(config, options);

  return AxiosInstance(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error && __.isObject(error.data)) {
        throw error.data;
      }

      throw new Error(error.statusText);
    });
};

internals.post = (url, payload, options) => {
  let config = {
    method: "POST",
    url: url,
    data: payload,
  };
  config = Object.assign(config, options);
  return AxiosInstance(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error && __.isObject(error.data)) {
        throw error.data;
      }

      throw new Error(error.statusText);
    });
};

internals.put = (url, payload, options) => {
  let config = {
    method: "PUT",
    url: url,
    data: payload,
  };
  config = Object.assign(config, options);
  return AxiosInstance(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error && __.isObject(error.data)) {
        throw error.data;
      }

      throw new Error(error.statusText);
    });
};

internals.delete = (url, payload, options) => {
  let config = {
    method: "DELETE",
    url: url,
    data: payload,
  };
  config = Object.assign(config, options);
  return AxiosInstance(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error && __.isObject(error.data)) {
        throw error.data;
      }

      throw new Error(error.statusText);
    });
};

export default internals;
