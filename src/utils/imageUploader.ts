import {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_URL,
} from "@config/secret";
import axios from "axios";

export const checkImage = (file: File) => {
    let err = "";
    if (!file) return (err = "File does not exist.");

    if (file.size > 1024 * 1024)
        // 1mb
        err = "The largest image size is 1mb.";

    if (file.type !== "image/jpeg" && file.type !== "image/png")
        err = "Image format is incorrect.";

    return err;
};

export const imageUpload = async (images: FileList | never[]) => {
    const imageUrls = await Promise.all(
        Array.from(images).map(async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);
            const response = await axios.post(CLOUDINARY_URL, formData);
            return response?.data?.secure_url || "";
        })
    );

    return imageUrls;
};
