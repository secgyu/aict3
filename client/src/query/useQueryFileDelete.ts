import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const deleteImage = async (filename: string) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/files/delete/${filename}`);
  return response.data;
};

const useQueryFileDelete = () => {
  return useMutation({
    mutationFn: (filename: string) => deleteImage(filename),
    onSuccess: () => {
      alert("이미지가 삭제 되었습니다.");
      window.location.reload();
      console.log('onSuccess');
    },
    onError: (error) => {
      alert("이미지 삭제 중 오류가 발생했습니다.");
      console.error(error);
    }
  })
}

export default useQueryFileDelete;
