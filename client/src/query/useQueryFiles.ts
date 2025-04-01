import { useQuery } from "@tanstack/react-query";

const fetchFiles = async () => {
  const response = await fetch("http://localhost:4000/files");
  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }
  return response.json();
};

export const useQueryFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: fetchFiles,
  });
};
