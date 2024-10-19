<script setup lang="ts">
import { RetentionType, type DeckRevision } from "~/models";
import { computed } from "vue";

const props = defineProps({
  revisions: {
    type: Array as PropType<DeckRevision[]>,
    required: true,
  },
});

const emit = defineEmits(["filteredRetentionTypes"]);

// Define colors for each RetentionType
const retentionColors = {
  again: "bg-red-400",
  hard: "bg-yellow-500",
  good: "bg-blue-500",
  easy: "bg-green-500",
};

const { t } = useI18n();

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
  } as Record<RetentionType, number>;
});

const hovered = ref<RetentionType | null>(null);

const isHovering = (type: RetentionType) => {
  hovered.value = type;
};

const filteredRetentionTypes = (type: RetentionType) => {
  emit("filteredRetentionTypes", type);
};
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
      class="flex h-full w-full items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-300 dark:border-slate-700 dark:text-slate-600"
    >
      {{ t("decks.stats.noData") }}
    </div>
    <div
      v-else
      class="flex h-full flex-1 items-center overflow-hidden rounded-xl"
    >
      <div
        v-for="(percentage, type) in meanRetentionTypes"
        :key="type"
        class="flex h-full flex-1"
        :style="{ flex: percentage }"
        @mouseover="isHovering(type)"
        @mouseleave="hovered = null"
        @click="filteredRetentionTypes(type)"
      >
        <div
          class="flex h-full min-h-8 w-full cursor-pointer items-center justify-center text-white transition-all"
          :class="[
            retentionColors[type],
            { 'opacity-50': hovered && hovered !== type },
            { 'dark:opacity-90': hovered && hovered === type },
            { 'dark:opacity-75': !hovered },
          ]"
        >
          <span class="text-sm"> {{ percentage.toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
