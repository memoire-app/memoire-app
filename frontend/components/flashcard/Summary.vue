<script setup lang="ts">
import type { FlashcardAPI } from "~/models";
import { ref } from "vue";
const { t } = useI18n();
const props = defineProps({
  flashcard: {
    type: Object as () => FlashcardAPI,
    required: true,
  },
  noButtons: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["delete", "edit"]);

const state = ref<"front" | "back">("front");

const toggleState = () => {
  state.value = state.value === "front" ? "back" : "front";
};

const editCard = () => {
  emits("edit", props.flashcard.id);
};

const deleteCard = () => {
  emits("delete", props.flashcard.id);
};
</script>

<template>
  <div class="relative min-h-52 overflow-auto rounded transition-all">
    <div
      class="transform-style-3d absolute h-full w-full cursor-default bg-white transition-transform duration-700 dark:bg-neutral-700"
      :class="[state === 'back' ? 'rotate-y-180' : '']"
      @click="toggleState"
    >
      <!-- Front Side -->
      <div
        class="backface-hidden absolute h-full w-full overflow-auto"
        :class="[state === 'front' ? 'z-20' : 'z-10']"
      >
        <UtilsEditDelete
          v-if="!noButtons"
          class="absolute right-6 top-2 z-10"
          @edit="editCard"
          @delete="deleteCard"
        />
        <div class="absolute left-4 top-3 flex items-center gap-2 text-xs">
          <UIcon name="i-lucide-circle-help" size="16" />
          Question
        </div>
        <div class="h-full overflow-auto px-4 pt-12">
          {{ flashcard.front }}
        </div>
      </div>
      <!-- Back Side -->
      <div
        class="backface-hidden rotate-y-180 absolute h-full w-full bg-blue-950 text-white dark:bg-neutral-200 dark:text-black"
        :class="[state === 'back' ? 'z-20' : 'z-10']"
      >
        <div class="absolute right-6 top-3 flex items-center gap-2 text-xs">
          <UIcon name="i-lucide-circle-check-big" size="16" />
          {{ t("flashcards.answer") }}
        </div>

        <div class="h-full overflow-auto px-4 pt-12">{{ flashcard.back }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
