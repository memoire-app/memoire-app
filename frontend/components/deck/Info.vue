<script setup lang="ts">
import type { PublicDeckAPI, DeckAPI } from "~/models";

defineProps({
  deck: {
    type: Object as PropType<PublicDeckAPI | DeckAPI>,
    required: true,
  },
});
</script>
<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col gap-1">
      <div class="text-2xl font-semibold leading-tight">{{ deck.title }}</div>
      <div class="mb-4 flex flex-wrap gap-2">
        <DeckTag v-for="(tag, i) in deck.tagArray" :key="i" :tag="tag" />
      </div>
    </div>
    <UtilsLastUpdatedTag
      v-if="deck.updatedAt"
      :date="new Date(deck.updatedAt)"
    />
  </div>
</template>
