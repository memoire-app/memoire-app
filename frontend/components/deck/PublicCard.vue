<script setup lang="ts">
import type { PublicDeckAPI } from "~/models";
import type { PropType } from "vue";
import { copyCode } from "../../utils";

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
    class="flex h-fit justify-between bg-white px-4 py-4 ring-neutral-300 transition-all hover:cursor-pointer hover:ring-1 dark:bg-neutral-700"
    @click="emit('openPreview', props.deck.code)"
  >
    <div class="flex w-4/5 flex-col gap-1 pr-2">
      <span class="text-2xl font-semibold">{{ deck.title }}</span>
      <div class="mb-4 flex flex-wrap gap-2">
        <UBadge
          v-for="(tag, i) in props.deck.tagArray"
          :key="i"
          class="w-fit text-xs"
        >
          {{ tag }}
        </UBadge>
      </div>

      <UtilsAuthor
        :author-name="props.deck.authorName"
        :original="props.deck.original"
      />
      <UtilsLastUpdatedTag
        v-if="props.deck.updatedAt"
        :date="new Date(props.deck.updatedAt)"
      />
    </div>
    <div class="flex flex-col items-end justify-between gap-2">
      <div class="flex gap-2">
        <UTooltip text="Partager le deck">
          <UButton
            icon="i-lucide-share-2"
            size="xs"
            variant="soft"
            @click.stop="copy()"
          />
        </UTooltip>
        <UTooltip text="Importer le deck">
          <UButton
            icon="i-lucide-import"
            size="xs"
            variant="soft"
            color="green"
            @click.stop="emit('import', props.deck.code)"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
