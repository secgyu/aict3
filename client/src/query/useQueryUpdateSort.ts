import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Images } from "../feature/common/types.ts";

const updateSort = async (newImages: any) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/files/update`,
    newImages,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

const useQueryUpdateSort = () => {
  return useMutation(
    { mutationFn: async (newImages: Images[]) => updateSort(newImages) },
  )
}

export default useQueryUpdateSort;
