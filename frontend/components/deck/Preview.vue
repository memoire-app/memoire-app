<script setup lang="ts">
import type { PublicDeckAPI } from "~/models";
import type { PropType } from "vue";

const props = defineProps({
  deck: {
    type: Object as PropType<PublicDeckAPI>,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex h-full flex-col gap-6 overflow-auto bg-neutral-100 p-4 dark:bg-neutral-900"
  >
    <div class="flex flex-col gap-2">
      <span class="text-xl font-bold">{{ props.deck.title }}</span>
      <UtilsAuthor :deck="props.deck" :original="props.deck.original" />
      <div class="flex flex-wrap gap-2 pr-4">
        <UBadge
          v-for="(tag, i) in props.deck.tagArray"
          :key="i"
          class="w-fit text-xs"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>
    <div
      v-if="deck.flashcards.length > 0"
      class="flex h-full flex-col gap-3 overflow-auto"
    >
      <FlashcardSummary
        v-for="flashcard in deck.flashcards"
        :key="flashcard.id"
        :flashcard="flashcard"
        no-buttons
      />
    </div>
    <div v-else class="flex items-center justify-center">
      <span class="text-lg text-neutral-500 dark:text-neutral-400">
        Aucune carte dans ce deck
      </span>
    </div>
  </div>
</template>

<style scoped></style>
