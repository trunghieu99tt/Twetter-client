import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from "@config/secret";
import { UPLOAD_FILE_TYPE } from "@type/app.types";
import client from "api/client";
import axios from "axios";
import { UPLOAD_ENDPOINTS } from "constants/upload.constants";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useUpload = () => {
  const { t } = useTranslation();

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
    } catch (error: any) {
      console.log("upload image error: ", error, error.message);
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

  const uploadMedia = async (
    file: File,
    type: UPLOAD_FILE_TYPE = "tweet"
  ): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("type", type);
      const response = await client.post(UPLOAD_ENDPOINTS.BASE, formData);
      return response?.data?.[0] || "";
    } catch (error: any) {
      toast.error(t(error?.response?.data?.message));
      console.error(`[uploadMedia] error: `, error?.response);
    }

    return "";
  };

  const uploadMedias = async (
    files: File[],
    type: UPLOAD_FILE_TYPE = "tweet"
  ): Promise<string[]> => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("type", type);
      const response = await client.post(UPLOAD_ENDPOINTS.BASE, formData);
      return response?.data || [];
    } catch (error: any) {
      console.error(`[uploadMedias] error: `, error, error.message);
      toast.error(t(error?.response?.data?.message));
    }
    return [];
  };

  return {
    uploadSingleMedia,
    uploadMultiMedia,
    uploadImage,
    uploadImages,

    uploadMedia,
    uploadMedias,
  };
};
