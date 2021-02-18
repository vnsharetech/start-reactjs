const PRO_GATEWAY = "/inspection-api";

export const LOCAL_GATEWAY = "https://eeac-portal.ee-acco-staging.test.infodation.vn/inspection-api";

export default {
  serverURI:
    process.env.NODE_ENV === "production" ? PRO_GATEWAY : LOCAL_GATEWAY,
  S3_IMAGE_PATH: process.env.NODE_ENV === "production" ? "images" : "images",
};

export const GOOGLE_MAP_API_KEY = "AIzaSyAm3l7TL_p1Mzf3x3XIgBszBAunZQ6V6vE";
