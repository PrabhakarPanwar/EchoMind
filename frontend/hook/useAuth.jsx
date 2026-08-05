import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export function useAuth() {
  const {
    data: user,
    isPending,
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
  return { user, isPending, isError, isAuthenticated: !!user, isGuest: !user && !isPending && !isError };
}
