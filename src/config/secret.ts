// get env
export const getEnv = (key: string) => {
  const value = process.env[key];
  return value || "";
};

export const CLOUDINARY_CLOUD_NAME = getEnv("REACT_APP_CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_UPLOAD_PRESET = getEnv(
  "REACT_APP_CLOUDINARY_UPLOAD_PRESET"
);
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const AGORA_APP_ID = getEnv("REACT_APP_AGORA_APP_ID");
