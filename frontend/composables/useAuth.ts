import type { UserAPI } from "~/models";

export const useAuth = () => {
  const checkAuth = async () => {
    try {
      const headers = useRequestHeaders();
      const runtimeConfig = useRuntimeConfig();
      return $fetch<UserAPI>(`/me`, {
        baseURL: runtimeConfig.public.BACK_URL as string,
        headers,
        credentials: "include",
      });
    } catch {
      return false;
    }
  };

  return {
    checkAuth,
  };
};
