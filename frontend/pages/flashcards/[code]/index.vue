<script setup lang="ts">
import type { DeckAPI, FlashCardListApi } from "~/models";
import { copyCode } from "~/utils";

definePageMeta({
  layout: "app",
  middleware: "auth",
});

const headers = useRequestHeaders();
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const code = route.params.code;
const toast = useToast();

const { data, refresh } = await useFetch<FlashCardListApi>(`/decks/${code}`, {
  baseURL: runtimeConfig.public.BACK_URL as string,
  headers,
  credentials: "include",
});

const shortTitle = computed(() => {
  if (!data.value) return "";
  if (data.value?.deckTitle?.length > 20) {
    return data.value?.deckTitle.slice(0, 20) + "...";
  }
  return data.value?.deckTitle;
});

const links = [
  {
    label: "Flashcards",
    icon: "i-cbi-garbage-cardboard",
    to: "/flashcards",
  },
  {
    label: `${shortTitle.value}`,
    icon: "i-lucide-rectangle-vertical",
    to: `/flashcards/${code}`,
  },
];

const flashcardsSortedByCreatedAt = computed(() => {
  if (!data.value) return [];
  return [...data.value.flashcards].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
});

const editIsOpen = ref(false);
const editDeckIsOpen = ref(false);
const deleteIsOpen = ref(false);
const currentFlashCardId = ref(-1);
const question = ref("");
const answer = ref("");
const title = ref(data.value?.deckTitle);
const bufferedTags = ref();

const clearInputs = () => {
  question.value = "";
  answer.value = "";
};

const createOrUpdateFlashcard = async () => {
  if (currentFlashCardId.value === -1) {
    // Create new flashcard
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
  } else {
    // Update existing flashcard
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
  }

  await refresh();
  clearInputs();
  editIsOpen.value = false;
  currentFlashCardId.value = -1; // Reset current flashcard ID after edit
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
    deleteIsOpen.value = false;
    currentFlashCardId.value = -1;
  }
};

const isCurrentRevisionAvailable = computed(
  () =>
    data.value?.currentRevision &&
    data?.value?.currentRevision.flashcards.length > 0,
);

const createNewRevision = async () => {
  await $fetch(`/decks/${code}/revisions`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    method: "POST",
    headers,
    credentials: "include",
  });

  await refresh();

  await router.push({
    path: "/flashcards/" + route.params.code + "/play",
  });
};

const flashcardSelected = computed(() => {
  // Check if a flashcard is selected, if yes adapt question and answer
  if (currentFlashCardId.value === -1) {
    return null;
  }

  return data.value?.flashcards.find(
    (flashcard) => flashcard.id === currentFlashCardId.value,
  );
});

watch(flashcardSelected, (flashcard) => {
  if (flashcard) {
    question.value = flashcard.front;
    answer.value = flashcard.back;
  } else {
    question.value = "";
    answer.value = "";
  }
});

const copy = () => {
  copyCode(code as string);
  toast.add({
    title: "Code copié : " + route.params.code,
    icon: "i-lucide-circle-check-big",
  });
};

const privatizeDeck = async () => {
  await $fetch(`/decks/${code}/privatize`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
  });

  toast.add({ title: "Deck privatisé", icon: "i-lucide-lock-keyhole" });
  refresh();
};

const publicizeDeck = async () => {
  await $fetch(`/decks/${code}/publicize`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
  });

  toast.add({ title: "Deck public", icon: "i-lucide-lock-keyhole-open" });
  refresh();
};

const openEditDeck = () => {
  if (!data.value) return;
  title.value = data.value.deckTitle;

  bufferedTags.value = [...data.value.deckTags];
  editDeckIsOpen.value = true;
};

const editDeck = async () => {
  await $fetch(`/decks/${code}`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify({
      title: title.value,
      tags: bufferedTags.value,
    }),
  });

  toast.add({ title: "Deck modifié", icon: "i-lucide-pen" });
  refresh();
  editDeckIsOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col">
    <UBreadcrumb :links="links" />

    <!-- Title and tags -->
    <div
      class="flex flex-col gap-4 py-4 lg:flex-row lg:justify-between lg:py-6"
    >
      <div class="flex w-full flex-col gap-1 text-xl lg:pr-14">
        <div class="h-fit w-fit">{{ data?.deckTitle }}</div>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(tag, i) in data?.deckTags"
            :key="i"
            class="w-fit text-xs"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-2 md:flex-row">
        <div
          class="flex flex-row justify-end gap-1 lg:flex-col lg:justify-between"
        >
          <UTooltip text="Modifier le deck">
            <UButton
              :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
              icon="i-lucide-pen"
              variant="outline"
              color="black"
              square
              @click.stop="openEditDeck()"
            />
          </UTooltip>
          <UTooltip text="Partager le deck">
            <UButton
              :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
              icon="i-lucide-share-2"
              variant="outline"
              square
              @click.stop="copy()"
            />
          </UTooltip>
          <UTooltip v-if="data?.deckIsPublic" text="Rendre le deck privé">
            <UButton
              :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
              icon="i-lucide-lock-keyhole-open"
              variant="outline"
              color="green"
              square
              @click.stop="privatizeDeck()"
            />
          </UTooltip>
          <UTooltip v-else text="Rendre le deck public">
            <UButton
              :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
              icon="i-lucide-lock-keyhole"
              variant="outline"
              color="orange"
              square
              @click.stop="publicizeDeck()"
            />
          </UTooltip>
        </div>
        <UButton
          :disabled="!isCurrentRevisionAvailable"
          :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
          icon="i-heroicons-play-20-solid"
          size="lg"
          class="flex flex-1 justify-center lg:flex-none"
          variant="outline"
          @click="
            router.push({
              path: '/flashcards/' + route.params.code + '/play',
            })
          "
        >
          Reprendre
        </UButton>
        <UButton
          :disabled="!data?.flashcards.length"
          :ui="{ rounded: 'rounded-none', base: 'disabled:opacity-30' }"
          icon="i-heroicons-plus-20-solid"
          size="lg"
          class="flex flex-1 justify-center lg:flex-none"
          @click="createNewRevision"
        >
          Nouvelle révision
        </UButton>
      </div>
    </div>

    <!-- Stats -->
    <!-- <div class="mb-4 flex items-end justify-between">
      <div class="grid w-full grid-cols-2 gap-4 xl:grid-cols-3">
        <DashboardBasicStatsCard>
          <template #title>Nb révisions</template>
          <template #icon>
            <UIcon name="i-lucide-notebook-tabs" size="20" />
          </template>
          <template #data>{{ data?.nbRevisions }}</template>
        </DashboardBasicStatsCard>
      </div>
    </div> -->

    <!-- Flashcard board -->
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <FlashcardCreate
        @click="
          editIsOpen = true;
          clearInputs();
        "
      />
      <FlashcardSummary
        v-for="flashcard in flashcardsSortedByCreatedAt"
        :key="flashcard.id"
        :flashcard="flashcard"
        @delete="
          (flashcardId: number) => {
            currentFlashCardId = flashcardId;
            deleteIsOpen = true;
          }
        "
        @edit="
          (flashcardId: number) => {
            currentFlashCardId = flashcardId;
            editIsOpen = true;
            flashcardSelected;
          }
        "
      />
    </div>

    <!-- Modal to EDIT the deck -->
    <UModal v-model="editDeckIsOpen">
      <div class="flex w-full flex-col items-end gap-3 p-4">
        <div class="flex h-full w-full flex-col gap-4">
          <label class="text-lg">Modifier le deck</label>
          <UFormGroup label="Titre du deck">
            <UInput v-model="title" placeholder="Mon super deck" />
          </UFormGroup>
          <UFormGroup label="Tags">
            <DeckTagsInput v-model="bufferedTags" />
          </UFormGroup>
        </div>
        <div class="flex items-end gap-2">
          <UButton
            class="w-fit"
            variant="ghost"
            @click="editDeckIsOpen = false"
          >
            Annuler
          </UButton>
          <UButton
            class="w-fit"
            icon="i-heroicons-check-20-solid"
            :ui="{ base: 'disabled:opacity-30' }"
            @click="editDeck()"
          >
            Modifier
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Modal to EDIT a card -->
    <UModal v-model="editIsOpen">
      <div class="flex w-full flex-col items-end gap-3 p-4">
        <div class="flex w-full flex-col items-center justify-center gap-2">
          <div class="flex w-full flex-col gap-1">
            <label class="flex items-center gap-2 text-sm">
              <UIcon name="i-lucide-circle-help" />
              Question
            </label>
            <UTextarea
              v-model="question"
              class="w-full"
              :rows="6"
              placeholder="Quelle est la couleur du cheval blanc de Henri IV ?"
            />
          </div>
          <div class="flex w-full flex-col gap-1">
            <label class="flex items-center gap-2 text-sm">
              <UIcon name="i-lucide-circle-check-big" />
              Réponse
            </label>
            <UTextarea
              v-model="answer"
              class="w-full"
              :rows="6"
              placeholder="Blanc"
            />
          </div>
        </div>
        <div class="flex items-end gap-2">
          <UButton class="w-fit" variant="ghost" @click="editIsOpen = false">
            Annuler
          </UButton>
          <UButton
            class="w-fit"
            icon="i-heroicons-check-20-solid"
            :ui="{ base: 'disabled:opacity-30' }"
            :disabled="!question || !answer"
            @click="createOrUpdateFlashcard()"
          >
            {{ currentFlashCardId === -1 ? "Créer" : "Modifier" }}
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Modal to DELETE a card -->
    <UModal v-model="deleteIsOpen">
      <div class="flex flex-col gap-4 p-4">
        <label class="text-lg">Supprimer la carte</label>
        <span class="text-sm"
          >Êtes-vous sûr de vouloir supprimer cette carte ?</span
        >
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            class="h-fit"
            @click="deleteIsOpen = false"
          >
            Annuler
          </UButton>
          <UButton color="red" size="sm" class="h-fit" @click="deleteCard()">
            Supprimer
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<style scoped></style>
