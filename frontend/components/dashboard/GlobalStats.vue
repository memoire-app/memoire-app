<script setup lang="ts">
import type { DashboardStats } from "~/models";
import BasicStatsCard from "./BasicStatsCard.vue";
const { t } = useI18n();
// Define props
defineProps<{
  data: DashboardStats;
}>();
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
            count: (data.nbFlashcards / data.nbDecks).toFixed(2),
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
            count: (data.revisions.length / data.nbDecks).toFixed(2),
          })
        }}
      </template>
    </BasicStatsCard>
  </div>
</template>
