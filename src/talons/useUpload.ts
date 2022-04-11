import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from "@config/secret";
import client from "api/client";
import axios from "axios";
import { UPLOAD_ENDPOINTS } from "constants/upload.constants";

export const useUpload = () => {
  const uploadImage = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await client.post(
        UPLOAD_ENDPOINTS.UPLOAD_SINGLE_IMAGE,
        formData
      );
      return response?.data?.url || "";
    } catch (error) {
      console.log("upload image error: ", error);
    }
  };

  const uploadImages = async (files: FileList | never[]) => {
    if (!files || !files?.length) return;
    return Promise.all(
      Array.from(files).map(async (file) => {
        return uploadImage(file);
      })
    );
  };

  const uploadSingleMedia = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data?.secure_url || "";
  };

  const uploadMultiMedia = async (files: File[]) => {
    const mediaUrls = await Promise.all(
      Array.from(files).map(async (file: File) => {
        return await uploadSingleMedia(file);
      })
    );
    return mediaUrls;
  };

  return {
    uploadSingleMedia,
    uploadMultiMedia,
    uploadImage,
    uploadImages,
  };
};
