<script setup lang="ts">
import type { DashboardStats, DeckAPI, DeckListAPI } from "~/models";
import TabsGroup from "~/components/tabs/TabsGroup.vue";

definePageMeta({
  layout: "app",
  middleware: "auth",
});

const headers = useRequestHeaders();
const runtimeConfig = useRuntimeConfig();
const LIMIT = 25;

const { data, refresh } = await useFetch<DeckListAPI>(`/decks`, {
  query: { limit: LIMIT, page: 1 },
  baseURL: runtimeConfig.public.BACK_URL as string,
  headers,
  credentials: "include",
  lazy: true,
});

const { data: stats } = await useFetch<DashboardStats>(`/stats`, {
  baseURL: runtimeConfig.public.BACK_URL as string,
  headers,
  credentials: "include",
  lazy: true,
});

const toast = useToast();

const createDeckOpen = ref(false);
const importModalOpen = ref(false);
const deckTitle = ref("");
const deckTags = ref<string[]>([]);
const isPublic = ref(false);
const importCode = ref("");
const page = ref(1);
const searchQuery = ref("");
const activeTab = ref(0);

const links = [
  {
    label: "Flashcards",
    icon: "i-cbi-garbage-cardboard",
    to: "/flashcards",
  },
];

const openSlideover = () => {
  createDeckOpen.value = true;
};

const resetInputs = () => {
  deckTitle.value = "";
  deckTags.value = [];
};

const handleDeckActions = async () => {
  await refresh();
  createDeckOpen.value = false;
  resetInputs();
  if (activeTab.value === 1) activeTab.value = 0;
};

const createDeck = async () => {
  if (!deckTitle.value) return;

  try {
    await $fetch<DeckAPI>(`/decks`, {
      baseURL: runtimeConfig.public.BACK_URL as string,
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({
        title: deckTitle.value,
        tags: deckTags.value,
        isPublic: isPublic.value,
      }),
    });
    handleDeckActions();
  } catch {
    // Handle error
  }
};

const importDeckWithCode = async () => {
  if (!importCode.value) return;

  try {
    await $fetch<DeckAPI>(`/decks/${importCode.value}/import`, {
      baseURL: runtimeConfig.public.BACK_URL as string,
      method: "POST",
      headers,
      credentials: "include",
    });
    await refresh();
    importModalOpen.value = false;
    importCode.value = "";
    toast.add({
      title: "Deck importé avec succès",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch {
    toast.add({
      title: "Erreur lors de l'import",
      icon: "i-lucide-bug",
      color: "red",
    });
  }
};

const search = async () => {
  try {
    const response = await $fetch<DeckListAPI>(`/decks`, {
      query: { search: searchQuery.value, page: 1, limit: LIMIT },
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
    const response = await $fetch<DeckListAPI>(`/decks`, {
      query: { limit: LIMIT, page, search: searchQuery.value },
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

watch(page, (newPage) => {
  navigate(newPage);
});
</script>

<template>
  <div>
    <UBreadcrumb :links="links" />

    <TabsGroup v-model:active-tab="activeTab" class="mt-4 md:mt-8" />

    <!-- MES DECKS tab -->
    <div v-if="activeTab === 0">
      <div
        v-if="data"
        class="mt-4 flex flex-col-reverse gap-2 lg:flex-row-reverse lg:justify-between"
      >
        <div class="flex w-full flex-col gap-2 lg:w-fit lg:flex-row">
          <UButton
            size="lg"
            :ui="{ rounded: 'rounded-none' }"
            icon="i-lucide-import"
            class="flex w-full justify-center lg:w-fit"
            variant="outline"
            @click="importModalOpen = true"
            >Importer un deck
          </UButton>
          <UButton
            size="lg"
            :ui="{ rounded: 'rounded-none' }"
            icon="i-heroicons-plus-20-solid"
            class="flex w-full justify-center lg:w-fit"
            @click="openSlideover()"
            >Créer un deck
          </UButton>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <UInput
              v-model="searchQuery"
              size="lg"
              placeholder="Rechercher un deck"
              icon="i-lucide-search"
              class="w-full"
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
            >{{ data.nbDecks }} deck(s)</span
          >
        </div>
      </div>

      <div v-if="data" class="mt-4">
        <div class="flex justify-between gap-1 pb-2">
          <UPagination
            v-model="page"
            :total="data.nbDecks"
            :page-count="LIMIT"
          />
        </div>

        <div class="grid grid-cols-1 gap-3">
          <DeckCard
            v-for="deck in data.decks"
            :key="deck.id"
            :deck="deck"
            @refresh="refresh"
          />
        </div>
      </div>

      <USlideover v-model="createDeckOpen">
        <div class="flex-1 p-4">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="absolute end-5 top-5 z-10 flex sm:hidden"
            square
            padded
            @click="createDeckOpen = false"
          />
          <div class="flex h-full w-full flex-col gap-4 pt-8">
            <label class="text-lg">Créer un deck</label>
            <UFormGroup label="Titre du deck">
              <UInput v-model="deckTitle" placeholder="Mon super deck" />
            </UFormGroup>
            <UFormGroup label="Tags">
              <DeckTagsInput v-model="deckTags" />
            </UFormGroup>
            <UFormGroup label="Public">
              <UTooltip text="Rend le deck accessible publiquement">
                <UToggle v-model="isPublic" />
              </UTooltip>
            </UFormGroup>
            <div class="flex justify-end">
              <UButton
                class="w-fit"
                :ui="{ rounded: 'rounded-none' }"
                icon="i-heroicons-plus-20-solid"
                @click="createDeck()"
                >Créer</UButton
              >
            </div>
          </div>
        </div>
      </USlideover>

      <UModal v-model="importModalOpen">
        <div class="flex flex-col gap-4 p-4">
          <label class="text-lg">Importer un deck</label>
          <UInput v-model="importCode" placeholder="Code du deck" />
          <div class="flex items-center justify-end gap-2">
            <UButton
              color="blue"
              size="sm"
              class="h-fit"
              variant="ghost"
              @click="importModalOpen = false"
            >
              Annuler
            </UButton>
            <UButton
              color="blue"
              size="sm"
              class="h-fit"
              @click="importDeckWithCode"
              >Importer
            </UButton>
          </div>
        </div>
      </UModal>
    </div>

    <!-- DASHBOARDS tab -->
    <div v-if="activeTab === 1 && stats">
      <div class="mt-4 flex flex-col gap-6">
        <DashboardGlobalStats :data="stats" />
        <div class="flex flex-col gap-4 md:flex-row">
          <DashboardBarChart :data="stats" />
          <DashboardPieChart :data="stats" />
        </div>
      </div>
    </div>
  </div>
</template>
