<script setup lang="ts">
import type {
  RevisionAPI,
  RetentionType,
  FlashCardListApi,
  FlashcardAPI,
} from "~/models";
const { t } = useI18n();
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const route = useRoute();
const headers = useRequestHeaders();
const runtimeConfig = useRuntimeConfig();

const code = route.params.code;
const { data, refresh, status } = await useFetch<FlashCardListApi>(
  `/decks/${code}`,
  {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
  },
);

const side = ref<"front" | "back">("front");
const revisionId = ref<number | null>(null);
const finished = ref(false);
const isFinishedStateOpen = ref(false);
const flashcardIdSent = ref();
const isEvaluationHelpOpen = ref(false);

const nbItemsCompleted = computed(() => {
  if (revisionId.value && data.value?.currentRevision) {
    return (
      data.value?.flashcards.length -
      data.value?.currentRevision?.flashcards.length
    );
  }
  return 0;
});

const links = computed(() => [
  {
    label: "Flashcards",
    icon: "i-cbi-garbage-cardboard",
    to: "/flashcards",
  },
  {
    label: `${data.value?.deckTitle}`,
    icon: "i-lucide-rectangle-vertical",
    to: `/flashcards/${code}`,
  },
  {
    label: `${nbItemsCompleted.value} / ${data.value?.flashcards.length}`,
    icon: "i-lucide-rectangle-vertical",
    to: `/flashcards/${route.params.code}/play`,
  },
]);

const currentFlashcard = computed(() => {
  // Get a random flashcard from the current revision (try to avoid the same one 2 times in a row, we got the last sent with flashcardIdSent)
  // If flashcardIdSent is not set, we just get a random flashcard
  // If there is only one flashcard, we return it
  if (data.value && data.value.currentRevision) {
    const flashcards = data.value.currentRevision.flashcards;
    if (flashcards.length === 1) {
      return flashcards[0];
    }
    if (flashcardIdSent.value) {
      const filteredFlashcards = flashcards.filter(
        (flashcard) => flashcard.id !== flashcardIdSent.value,
      );
      return getRandomFlashcard(filteredFlashcards);
    }
    return getRandomFlashcard(flashcards);
  }
  return null;
});

const getRandomFlashcard = (flashcardList: FlashcardAPI[]) => {
  return flashcardList[Math.floor(Math.random() * flashcardList.length)];
};

type RetentionSelected = {
  message: string;
};

const handleRetentionSelected = async (retentionType: RetentionType) => {
  if (revisionId.value && currentFlashcard.value) {
    const res = await $fetch<RetentionSelected>(
      `/revisions/${revisionId.value}/flashcards/${currentFlashcard.value.id}`,
      {
        baseURL: runtimeConfig.public.BACK_URL as string,
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          retentionType,
        }),
      },
    );

    flashcardIdSent.value = currentFlashcard.value.id;

    await refresh();

    side.value = "front";

    // Check if revision is finished (201 with FINISHED message)
    if (res.message === "FINISHED") {
      finished.value = true;
    }
  }
};

const fetchOrCreateRevision = async () => {
  try {
    const existingRevision = await $fetch<RevisionAPI>(
      `/decks/${code}/revisions/current`,
      {
        baseURL: runtimeConfig.public.BACK_URL as string,
        headers,
        credentials: "include",
      },
    );

    if (existingRevision && existingRevision.id) {
      revisionId.value = existingRevision.id;
    } else {
      const newRevision = await $fetch<RevisionAPI>(
        `/decks/${code}/revisions`,
        {
          baseURL: runtimeConfig.public.BACK_URL as string,
          method: "POST",
          headers,
          credentials: "include",
        },
      );

      revisionId.value = newRevision.id;

      await refresh();
    }
  } catch (error) {
    console.error("Failed to fetch or create revision:", error);
  }
};

// Fetch or create a revision on page load
onMounted(async () => {
  await fetchOrCreateRevision();
});

// Watch for finished status to trigger modal display
watch(finished, (newVal) => {
  if (newVal) {
    isFinishedStateOpen.value = true;
  }
});

// Function to handle modal actions
const handleModalAction = async (action: "create" | "back") => {
  if (action === "create") {
    await fetchOrCreateRevision();
    finished.value = false;
    isFinishedStateOpen.value = false;
  } else if (action === "back") {
    // Redirect back to deck or perform necessary action
    await useRouter().push(`/flashcards/${code}`);
  }
};

defineShortcuts({
  " ": () => (side.value = side.value === "front" ? "back" : "front"),
});
</script>

<template>
  <div class="flex flex-col">
    <UBreadcrumb :links="links" />

    <div class="flex w-full flex-col gap-1 pb-4 pt-8">
      <div class="h-fit w-fit text-xl">{{ data?.deckTitle }}</div>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="(tag, i) in data?.deckTags"
          :key="i"
          class="w-fit text-xs"
        >
          {{ tag }}
        </UBadge>
      </div>

      <div class="mt-4 flex flex-col items-end gap-2">
        <FlashcardPlayerCardsFinishedTag
          :nb-finished="nbItemsCompleted"
          :total="data!.flashcards.length"
        />
        <UMeter
          :value="nbItemsCompleted"
          :max="data?.flashcards.length"
          color="green"
        />
      </div>
    </div>

    <div
      v-if="!finished"
      class="mb-4 flex w-full flex-col gap-4 transition-all duration-500"
    >
      <FlashcardPlayerCard v-if="status === 'pending'" :side="side"
        ><template #front>
          <svg
            aria-hidden="true"
            class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </template>
      </FlashcardPlayerCard>
      <FlashcardPlayerCard
        v-if="status === 'success' && currentFlashcard"
        :side="side"
      >
        <template #front>
          <span class="text-2xl">{{ currentFlashcard.front }}</span>
        </template>
        <template #back>
          <span class="text-2xl">{{ currentFlashcard.back }}</span>
        </template>
      </FlashcardPlayerCard>
      <UButton
        :ui="{ rounded: 'rounded-none' }"
        size="sm"
        class="flex min-h-12 items-center justify-center gap-3"
        color="white"
        @click="side = side === 'front' ? 'back' : 'front'"
      >
        <UIcon
          :name="
            side === 'front'
              ? 'i-lucide-circle-check-big'
              : 'i-lucide-circle-help'
          "
          size="20"
        />
        {{
          side === "front"
            ? t("revision.seeResponse")
            : t("revision.seeQuestion")
        }}
      </UButton>
    </div>

    <div v-if="!finished" class="flex flex-col gap-2">
      <div class="flex items-center gap-0.5">
        <span class="text-sm text-neutral-500">{{
          t("revision.evaluation")
        }}</span>
        <UButton
          icon="i-lucide-badge-info"
          size="xs"
          color="gray"
          square
          variant="ghost"
          @click="isEvaluationHelpOpen = true"
        />
      </div>
      <FlashcardPlayerRetentionButtonsContainer
        @retention-selected="handleRetentionSelected"
      />
    </div>

    <!-- Modal for Finished State -->
    <UModal v-model="isFinishedStateOpen" prevent-close>
      <div class="flex flex-col gap-6 p-4">
        <div class="text-xl font-bold">🥳 {{ t("revision.congrats") }} !</div>
        <div class="text-sm text-neutral-600">
          {{ t("revision.finished") }}
        </div>
        <div class="flex justify-end gap-2">
          <UButton variant="outline" @click="handleModalAction('create')">
            {{ t("revision.again") }}
          </UButton>
          <UButton @click="handleModalAction('back')">
            {{ t("revision.backToDeck") }}
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Modal for Evaluation Help -->
    <UModal v-model="isEvaluationHelpOpen" prevent-close>
      <div class="flex flex-col gap-6 p-4">
        <div class="text-xl font-bold">🤔 {{ t("revision.how.title") }}</div>
        <div class="text-sm">
          {{ t("revision.how.desc") }}
          <UtilsHighlightedWord
            :color-options="{
              borderColor: 'border-yellow-300',
              backgroundColor: 'bg-yellow-50',
              darkBorderColor: 'dark:border-yellow-700',
              darkBackgroundColor: 'dark:bg-yellow-600',
            }"
            >{{ t("revision.criterias.hard") }}</UtilsHighlightedWord
          >,
          <UtilsHighlightedWord>{{
            t("revision.criterias.good")
          }}</UtilsHighlightedWord>
          {{ t("utils.or") }}
          <UtilsHighlightedWord
            :color-options="{
              borderColor: 'border-green-300',
              backgroundColor: 'bg-green-50',
              darkBorderColor: 'dark:border-green-950',
              darkBackgroundColor: 'dark:bg-green-900',
            }"
            >{{ t("revision.criterias.easy") }}</UtilsHighlightedWord
          >, {{ t("revision.how.descNext") }}
        </div>
        <div class="text-sm">
          {{ t("revision.how.desc") }}
          <UtilsHighlightedWord
            :color-options="{
              borderColor: 'border-red-300',
              backgroundColor: 'bg-red-50',
              darkBorderColor: 'dark:border-red-950',
              darkBackgroundColor: 'dark:bg-red-900',
            }"
            >{{ t("revision.criterias.again") }}</UtilsHighlightedWord
          >, {{ t("revision.how.descAgain") }}
        </div>
        <div class="text-sm">
          {{ t("revision.how.moreInformation") }}
          <UButton
            class="p-1"
            to="https://github.com/memoire-app/memoire-app"
            target="_blank"
            variant="link"
            >GitHub</UButton
          >.
        </div>
        <div class="flex justify-end gap-2">
          <UButton @click="isEvaluationHelpOpen = false">
            {{ t("utils.close") }}
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
<style scoped></style>
