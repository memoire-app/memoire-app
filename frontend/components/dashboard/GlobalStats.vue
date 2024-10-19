<script setup lang="ts">
import type { DashboardStats } from "~/models";
import BasicStatsCard from "./BasicStatsCard.vue";
const { t } = useI18n();
// Define props
const props = defineProps<{
  data: DashboardStats;
}>();

const nbAvgCardsPerDeck = computed(() => {
  if (props.data.nbDecks === 0) return 0;
  return (props.data.nbFlashcards / props.data.nbDecks).toFixed(2);
});

const nbAvgRevisionsPerDeck = computed(() => {
  if (props.data.nbDecks === 0) return 0;
  return (props.data.revisions.length / props.data.nbDecks).toFixed(2);
});
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <BasicStatsCard class="flex-1">
      <template #icon>
        <UIcon name="i-cbi-garbage-cardboard" />
      </template>
      <template #title> {{ t("dashboards.totalDecks.title") }} </template>
      <template #data>
        {{ data.nbDecks }}
      </template>
      <template #description>
        {{ t("dashboards.totalDecks.desc", { count: data.nbDecksPublic }) }}
      </template>
    </BasicStatsCard>
    <BasicStatsCard class="flex-1">
      <template #icon>
        <UIcon name="i-lucide-rectangle-vertical" />
      </template>
      <template #title> {{ t("dashboards.totalCards.title") }} </template>
      <template #data>
        {{ data.nbFlashcards }}
      </template>
      <template #description>
        {{
          t("dashboards.totalCards.desc", {
            count: nbAvgCardsPerDeck,
          })
        }}
      </template>
    </BasicStatsCard>

    <BasicStatsCard class="flex-1">
      <template #icon>
        <UIcon name="i-lucide-brain" />
      </template>
      <template #title> {{ t("dashboards.totalRevisions.title") }} </template>
      <template #data>
        {{ data.revisions.length }}
      </template>
      <template #description>
        {{
          t("dashboards.totalCards.desc", {
            count: nbAvgRevisionsPerDeck,
          })
        }}
      </template>
    </BasicStatsCard>
  </div>
</template>
