import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// const delay = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const fetchDisplayTime = async () => {
  // await delay(1000)
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/display-settings`,
  );
  return data;
}

const useQueryDisplayTime = () => {
  return useQuery({
    queryKey: ["delay-sec"],
    queryFn: fetchDisplayTime,

  });
}

export default useQueryDisplayTime;
