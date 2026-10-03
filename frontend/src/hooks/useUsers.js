import { syncUser } from "@/api/users";
import { useMutation } from "@tanstack/react-query";

export const useSyncUser = (userId) => {
  return useMutation({
    mutationFn: (data) => syncUser(userId, data),
  });
};
