import FetchFromAxios from "./AxiosUtil";
import getAPI from "../common/getAPI";

// Fungsi bantu untuk mengupload file ke backend
export const uploadFileToBackend = async (file, type) => {
  if (!file) {
    return "";
  }

  const formData = new FormData();

  formData.append("image", file);

  try {
    const uploadRes = await FetchFromAxios({
      ...getAPI.uploadFile,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (uploadRes.data.success && uploadRes.data.data?.url) {
      return uploadRes.data.data.url; // Kembalikan URL yang berhasil
    } else {
      throw new Error(uploadRes.data.message || `Gagal mengupload ${type}.`);
    }
  } catch (uploadError) {
    console.error(
      `Error saat mengupload ${type}:`,
      uploadError.response?.data?.message || uploadError.message
    );
    throw new Error(`Gagal mengupload ${type}. Silakan coba lagi.`);
  }
};
