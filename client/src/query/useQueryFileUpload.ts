import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file as File);

  const response =
    await axios.post(
      `${process.env.REACT_APP_API_URL}/files`,
      formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  return response.data;
}

const useQueryFileUpload = () => {
  return useMutation(
    {
      mutationFn: async (file: File) => fileUpload(file), // mutationFn

      onSuccess: (data: any) => {
        alert("이미지 업로드 성공!");
        window.location.reload();
        console.log("Response Data:", data); // 성공 응답 로깅
      },
      onError: (error: any) => {
        alert("이미지 업로드 중 오류가 발생했습니다.");
        console.error("Error:", error);
      },
    }
  );
};

export default useQueryFileUpload;
