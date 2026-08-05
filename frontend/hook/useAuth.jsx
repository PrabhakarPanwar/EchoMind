import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth");
        return res.data.user
      } catch (err) {
        if (err.response?.status === 401) {
          return null
        }
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  })
  return { user, isLoading, isError, isAuthenticated: !!user, isGuest: !user && !isLoading && !isError };
}
