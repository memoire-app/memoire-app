<script setup lang="ts">
import type { PublicDeckAPI } from "~/models";
import type { PropType } from "vue";
import { copyCode } from "../../utils";
const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  deck: {
    type: Object as PropType<PublicDeckAPI>,
    required: true,
  },
});

const emit = defineEmits(["delete", "openPreview", "import"]);

const copy = () => {
  copyCode(props.deck.code);
  toast.add({
    title: "Code copié : " + props.deck.code,
    icon: "i-lucide-circle-check-big",
  });
};
</script>

<template>
  <div
    class="flex justify-between rounded border-t border-slate-100 bg-slate-50 px-4 py-4 shadow transition-all hover:cursor-pointer hover:border-slate-200 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
    @click="emit('openPreview', props.deck.code)"
  >
    <div class="flex h-full w-4/5 pr-2">
      <div class="flex flex-col justify-between">
        <DeckInfo :deck="props.deck" />
        <UtilsAuthor :deck="props.deck" :original="props.deck.original" />
      </div>
    </div>
    <div class="flex flex-col items-end justify-between gap-2">
      <div class="flex gap-2">
        <UTooltip :text="t('decks.share')">
          <UButton
            icon="i-lucide-share-2"
            size="xs"
            variant="ghost"
            @click.stop="copy()"
          />
        </UTooltip>
        <UTooltip :text="t('decks.import')">
          <UButton
            icon="i-lucide-import"
            size="xs"
            variant="ghost"
            @click.stop="emit('import', props.deck.code)"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
