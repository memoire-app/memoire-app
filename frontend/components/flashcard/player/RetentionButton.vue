<script setup lang="ts">
import type { RetentionType } from "~/models";

const props = defineProps<{
  retentionType: RetentionType;
}>();

const emit = defineEmits<{
  (e: "retention-clicked", retentionType: RetentionType): void;
}>();

const label: Record<RetentionType, string> = {
  again: "À revoir",
  hard: "Difficile",
  good: "Bien",
  easy: "Facile",
};

const retentionClasses: Record<RetentionType, string> = {
  again: "border-red-500 bg-red-100 text-red-800 hover:bg-red-200",
  hard: "border-yellow-500 bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  good: "border-blue-500 bg-blue-100 text-blue-800 hover:bg-blue-200",
  easy: "border-green-500 bg-green-100 text-green-800 hover:bg-green-200",
};

const retentionClass = computed(() => retentionClasses[props.retentionType]);

const handleClick = () => {
  emit("retention-clicked", props.retentionType);
};
</script>

<template>
  <button
    :class="[
      'flex h-20 flex-1 flex-col items-center justify-center gap-2 border-2 px-4 py-2 transition-colors duration-300',
      retentionClass,
    ]"
    @click="handleClick"
  >
    <span>{{ label[props.retentionType] }}</span>
  </button>
</template>
