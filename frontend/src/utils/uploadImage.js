import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
     
      // No need to manually set Content-Type, Axios handles it
    );
    console.log(res.data);
    return res.data; // should contain { imageUrl }
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};
