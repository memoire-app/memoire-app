<script setup lang="ts">
import { RetentionType, type DeckRevision } from "~/models";
import { computed } from "vue";

const props = defineProps({
  revisions: {
    type: Array as PropType<DeckRevision[]>,
    required: true,
  },
});

// Define colors for each RetentionType
const retentionColors = {
  again: "bg-red-400", // Red for "again"
  hard: "bg-yellow-500", // Yellow for "hard"
  good: "bg-blue-500", // Blue for "good"
  easy: "bg-green-500", // Green for "easy"
};

// Define labels for each RetentionType using computed for i18n
const { t } = useI18n();
const label = computed(() => ({
  again: t("revision.criterias.again"),
  hard: t("revision.criterias.hard"),
  good: t("revision.criterias.good"),
  easy: t("revision.criterias.easy"),
}));

// Calculate the mean proportions of each retention type for all revisions
const meanRetentionTypes = computed(() => {
  const totalCounts = { again: 0, hard: 0, good: 0, easy: 0 };
  let totalRetentions = 0;

  props.revisions.forEach((revision) => {
    revision.flashcards.forEach((flashcard) => {
      flashcard.result.forEach((result) => {
        totalCounts[result] += 1;
        totalRetentions += 1;
      });
    });
  });

  // Calculate proportions
  return {
    again: (totalCounts.again / totalRetentions) * 100,
    hard: (totalCounts.hard / totalRetentions) * 100,
    good: (totalCounts.good / totalRetentions) * 100,
    easy: (totalCounts.easy / totalRetentions) * 100,
  };
});
</script>

<template>
  <div
    class="flex flex-1 flex-col gap-2 rounded border border-slate-200 p-4 dark:border-slate-700"
  >
    <div
      class="mb-2 inline-flex gap-2 font-medium text-slate-600 dark:text-slate-400"
    >
      <UIcon name="i-lucide-chart-line" size="24" />
      {{ t("decks.stats.overview") }}
    </div>
    <div
      v-if="props.revisions.length === 0"
      class="flex h-8 w-full items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-300 dark:border-slate-700 dark:text-slate-600"
    >
      {{ t("decks.stats.noData") }}
    </div>
    <div v-else class="flex h-fit flex-1 items-center">
      <div
        v-for="(percentage, type, index) in meanRetentionTypes"
        :key="type"
        class="flex"
        :style="{ flex: percentage }"
      >
        <div
          class="flex h-8 w-full items-center justify-center text-sm"
          :class="[
            retentionColors[type],
            index === 0 ? 'rounded-l-lg' : '',
            index === Object.keys(meanRetentionTypes).length - 1
              ? 'rounded-r-lg'
              : '',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>
