import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../App";

const setTransitionTime = async (delaySec: number) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/display-settings`,
    { count: delaySec },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data;
}

const useQueryTransitionSetting = () => {
  return useMutation({
    mutationFn: async (delaySec: number) => {
      return setTransitionTime(delaySec);
    },
    onSuccess: (data: any) => {
      //alert("이미지 전환 시간 설정 성공!");
      console.log("Response Data:", data);
    },
    onError: (error: any) => {
      //alert("이미지 전환 시간 설정 중 오류가 발생했습니다.");
      console.error("Error:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['delay-sec'] })
    }
  });
}

export default useQueryTransitionSetting;
