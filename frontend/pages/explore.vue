<script setup lang="ts">
import type { PublicDeckListAPI, PublicDeckAPI } from "~/models";

definePageMeta({
  layout: "app",
  middleware: "auth",
});
const headers = useRequestHeaders();
const runtimeConfig = useRuntimeConfig();

const LIMIT = 25;

const isPreviewOpen = ref(false);
const deckPreview = ref<PublicDeckAPI | null>(null);
const searchQuery = ref("");
const page = ref(1);

const links = [
  {
    label: "Explorer",
    icon: "i-heroicons-magnifying-glass",
    to: "/explore",
  },
];

const toast = useToast();
const { data } = useFetch<PublicDeckListAPI>(`/decks`, {
  query: { public: true, limit: LIMIT, page: 1 },
  baseURL: runtimeConfig.public.BACK_URL as string,
  headers,
  credentials: "include",
});

const importDeck = async (code: string) => {
  try {
    await $fetch(`/decks/${code}/import`, {
      baseURL: runtimeConfig.public.BACK_URL as string,
      headers,
      credentials: "include",
      method: "POST",
    });
    toast.add({
      title: "Deck importé avec succès",
      ui: "success",
      color: "green",
      icon: "i-heroicons-check",
    });
  } catch {
    toast.add({
      title: "Erreur lors de l'importation du deck",
      ui: "error",
      color: "red",
      icon: "i-lucide-bug",
    });
  }
};

const search = async () => {
  try {
    const response = await $fetch<PublicDeckListAPI>(`/decks`, {
      query: { public: true, search: searchQuery.value, page: 1, limit: LIMIT },
      baseURL: runtimeConfig.public.BACK_URL as string,
      headers,
      credentials: "include",
    });
    data.value = response;
    page.value = 1;
  } catch {
    toast.add({
      title: "Erreur lors de la recherche",
      ui: "error",
      color: "red",
      icon: "i-lucide-bug",
    });
  }
};

const navigate = async (page: number) => {
  try {
    const response = await $fetch<PublicDeckListAPI>(`/decks`, {
      query: { public: true, limit: LIMIT, page, search: searchQuery.value },
      baseURL: runtimeConfig.public.BACK_URL as string,
      headers,
      credentials: "include",
    });
    data.value = response;
  } catch {
    toast.add({
      title: "Erreur lors de la navigation",
      ui: "error",
      color: "red",
      icon: "i-lucide-bug",
    });
  }
};

const openPreview = (code: string) => {
  isPreviewOpen.value = true;
  if (data.value && data.value.decks) {
    deckPreview.value =
      data.value.decks.find((deck) => deck.code === code) || null;
  }
};

watch(page, (newPage) => {
  navigate(newPage);
});
</script>

<template>
  <div>
    <UBreadcrumb :links="links" />

    <div
      v-if="data"
      class="mt-8 flex w-full max-w-[800px] flex-wrap gap-2 overflow-auto py-2 pl-0.5"
    >
      <DashboardBasicStatsCard class="flex-1">
        <template #title>
          <span>Decks publics</span>
        </template>
        <template #icon>
          <UIcon name="i-heroicons-magnifying-glass" />
        </template>
        <template #data>
          <span>{{ data.nbTotalDecks }}</span>
        </template>
        <template #description>
          <span>Nombre de decks publics au total</span>
        </template>
      </DashboardBasicStatsCard>

      <DashboardBasicStatsCard class="flex-1">
        <template #title>
          <span>Decks cette semaine</span>
        </template>
        <template #icon>
          <UIcon name="i-heroicons-calendar" />
        </template>
        <template #data>
          <span>{{ data.nbWeeklyDecks }}</span>
        </template>
        <template #description>
          <span>Decks publics créés cette semaine</span>
        </template>
      </DashboardBasicStatsCard>
    </div>

    <div v-if="data" class="mb-4 mt-8 flex flex-col gap-1">
      <div class="flex gap-2">
        <UInput
          v-model="searchQuery"
          placeholder="Rechercher un deck"
          icon="i-lucide-search"
          size="lg"
          class="w-full md:w-fit"
          @keyup.enter="search"
        />
        <!-- Icon Only on Small Screens -->
        <UButton
          size="lg"
          icon="i-lucide-search"
          class="sm:hidden"
          @click="search"
        />

        <!-- Classic Button on Medium Screens and Larger -->
        <UButton
          size="lg"
          icon="i-lucide-search"
          class="hidden sm:flex"
          @click="search"
        >
          Rechercher
        </UButton>
      </div>
      <span class="text-sm italic opacity-50"
        >{{ data.nbMatchedDecks }} deck(s)</span
      >

      <UPagination
        v-model="page"
        :total="data.nbMatchedDecks"
        :page-count="LIMIT"
      />
    </div>
    <div v-if="data">
      <div class="grid grid-cols-1 gap-3">
        <DeckPublicCard
          v-for="deck in data.decks"
          :key="deck.code"
          :deck="deck"
          @import="
            (code: string) => {
              importDeck(code);
            }
          "
          @open-preview="
            (code: string) => {
              openPreview(code);
            }
          "
        />
      </div>

      <USlideover v-model="isPreviewOpen">
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="absolute end-5 top-4 z-10 flex sm:hidden"
          square
          padded
          @click="isPreviewOpen = false"
        />
        <DeckPreview v-if="deckPreview" :deck="deckPreview" />
      </USlideover>
    </div>
  </div>
</template>
