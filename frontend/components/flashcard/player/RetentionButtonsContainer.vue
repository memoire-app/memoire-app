<script setup lang="ts">
import type { RetentionType } from "~/models";
import RetentionButton from "~/components/flashcard/player/RetentionButton.vue";

const emit = defineEmits<{
  (e: "retention-selected", retentionType: RetentionType): void;
}>();

const handleRetentionClicked = (retentionType: RetentionType) => {
  emit("retention-selected", retentionType);
};
</script>

<template>
  <div class="grid w-full grid-cols-2 gap-4 md:flex">
    <RetentionButton
      retention-type="again"
      @retention-clicked="handleRetentionClicked"
    />
    <RetentionButton
      retention-type="hard"
      @retention-clicked="handleRetentionClicked"
    />
    <RetentionButton
      retention-type="good"
      @retention-clicked="handleRetentionClicked"
    />
    <RetentionButton
      retention-type="easy"
      @retention-clicked="handleRetentionClicked"
    />
  </div>
</template>
