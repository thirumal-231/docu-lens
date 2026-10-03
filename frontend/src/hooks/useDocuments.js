import { getDocuments } from "@/api/documents";
import { useQuery } from "@tanstack/react-query";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });
};
