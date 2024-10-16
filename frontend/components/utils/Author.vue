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
        size="16"
        :style="{ color: props.original ? '#94a3b8' : '#f87171' }"
      />
      <span class="text-sm text-slate-400">{{ props.deck.authorName }}</span>
    </div>
  </UTooltip>
</template>
