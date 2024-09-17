<script setup lang="ts">
import type { DashboardStats } from "~/models";
import BasicStatsCard from "./BasicStatsCard.vue";

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
      <template #title> Nombre total de decks </template>
      <template #data>
        {{ data.nbDecks }}
      </template>
      <template #description>
        avec {{ data.nbDecksPublic }} decks publics
      </template>
    </BasicStatsCard>
    <BasicStatsCard class="flex-1">
      <template #icon>
        <UIcon name="i-lucide-rectangle-vertical" />
      </template>
      <template #title> Nombre total de cartes </template>
      <template #data>
        {{ data.nbFlashcards }}
      </template>
      <template #description>
        soit en moyenne
        {{ (data.nbFlashcards / data.nbDecks).toFixed(2) }} cartes / deck
      </template>
    </BasicStatsCard>

    <BasicStatsCard class="flex-1">
      <template #icon>
        <UIcon name="i-lucide-brain" />
      </template>
      <template #title> Nombre total de révisions </template>
      <template #data>
        {{ data.revisions.length }}
      </template>
      <template #description>
        soit en moyenne
        {{ (data.revisions.length / data.nbDecks).toFixed(2) }} révisions / deck
      </template>
    </BasicStatsCard>
  </div>
</template>
