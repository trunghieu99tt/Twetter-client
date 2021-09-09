import client from "api/client";
import { UPLOAD_ENDPOINTS } from "constants/upload.constants";

export const useUpload = () => {
    const uploadImage = async (file: File) => {
        if (!file)
            return;
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await client.post(UPLOAD_ENDPOINTS.UPLOAD_SINGLE_IMAGE, formData);
            return response?.data?.url || '';
        } catch (error) {
            console.log('upload image error: ', error)
        }
    }

    const uploadImages = async (files: FileList | never[]) => {
        if (!files || !files?.length)
            return;
        return Promise.all(Array.from(files).map(async (file) => {
            return uploadImage(file);
        }));
    }

    return {
        uploadImage,
        uploadImages
    }
}