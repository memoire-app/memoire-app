import type { FlashCardListApi } from "~/models";

export const useDeckData = (code: string, runtimeConfig: any, headers: any) => {
  const { data, refresh } = useFetch<FlashCardListApi>(`/decks/${code}`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
  });

  return { data, refresh };
};
