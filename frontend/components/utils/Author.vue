<script setup lang="ts">
import type { PublicDeckAPI } from "~/models";

const props = defineProps({
  deck: {
    type: Object as PropType<PublicDeckAPI>,
    required: true,
  },
  original: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div>
    <UTooltip
      :text="
        props.original
          ? `Créateur original`
          : `Créateur original : ${props.deck.originalAuthorName}`
      "
    >
      <div class="flex items-center gap-1">
        <UIcon
          name="i-lucide-circle-user-round"
          :class="[
            props.original
              ? 'text-black dark:text-neutral-300'
              : 'text-red-500',
          ]"
          size="16"
        />
        <span class="text-sm">{{ props.deck.authorName }}</span>
      </div>
    </UTooltip>
  </div>
</template>
