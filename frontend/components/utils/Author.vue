<script setup lang="ts">
import type { PublicDeckAPI } from "~/models";
const { t } = useI18n();
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
  <UTooltip
    :text="
      props.original
        ? t('decks.originalCreator')
        : `${t('decks.originalCreator')} : ${props.deck.originalAuthorName}`
    "
  >
    <div class="flex items-center gap-1">
      <UIcon
        name="i-lucide-circle-user-round"
        :class="[
          props.original ? 'text-black dark:text-neutral-300' : 'text-red-500',
        ]"
        size="16"
      />
      <span class="text-sm">{{ props.deck.authorName }}</span>
    </div>
  </UTooltip>
</template>
