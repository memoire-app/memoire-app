import type { RuntimeConfig } from "nuxt/schema";
import type { DeckAPI } from "~/models";

export const useFlashcardOperations = (
  code: string,
  runtimeConfig: RuntimeConfig,
  headers: HeadersInit,
  refresh: () => Promise<void>,
  t: (key: string) => string,
) => {
  const isCreating = ref(false);
  const createOrEditIsOpen = ref(false);
  const isCreate = ref(false);
  const currentFlashCardId = ref(-1);
  const question = ref("");
  const answer = ref("");
  const deleteIsOpen = ref(false);

  const clearInputs = () => {
    question.value = "";
    answer.value = "";
  };

  const createOrUpdateFlashcard = async () => {
    isCreating.value = true;
    if (currentFlashCardId.value === -1) {
      await $fetch<DeckAPI>(`/decks/${code}`, {
        baseURL: runtimeConfig.public.BACK_URL as string,
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          front: question.value,
          back: answer.value,
        }),
      });

      useToast().add({
        title: t("notifications.flashcards.createdSuccess"),
        icon: "i-lucide-circle-check-big",
      });
    } else {
      await $fetch<DeckAPI>(`/flashcards/${currentFlashCardId.value}`, {
        baseURL: runtimeConfig.public.BACK_URL as string,
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify({
          front: question.value,
          back: answer.value,
        }),
      });

      useToast().add({
        title: t("notifications.flashcards.updatedSuccess"),
        icon: "i-lucide-circle-check-big",
      });
    }

    await refresh();
    clearInputs();
    createOrEditIsOpen.value = false;
    currentFlashCardId.value = -1;
    isCreating.value = false;
  };

  const deleteCard = async () => {
    if (currentFlashCardId.value !== -1) {
      await $fetch(`/flashcards/${currentFlashCardId.value}`, {
        baseURL: runtimeConfig.public.BACK_URL as string,
        method: "DELETE",
        headers,
        credentials: "include",
      });

      await refresh();
      currentFlashCardId.value = -1;
      deleteIsOpen.value = false;
      useToast().add({
        title: t("notifications.flashcards.deletedSuccess"),
        icon: "i-lucide-circle-check-big",
      });
    }
  };

  return {
    createOrEditIsOpen,
    isCreate,
    currentFlashCardId,
    question,
    answer,
    isCreating,
    deleteIsOpen,
    clearInputs,
    createOrUpdateFlashcard,
    deleteCard,
  };
};
