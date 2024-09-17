<script setup lang="ts">
const props = defineProps<{
  side: "front" | "back";
}>();

const prettyPrintSide = computed(() => {
  return props.side === "front" ? "Question" : "Réponse";
});
</script>

<template>
  <div
    class="relative h-[400px] w-full"
    :class="
      props.side === 'front'
        ? 'bg-white text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200'
        : 'bg-blue-950 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-700'
    "
  >
    <div
      class="absolute top-3 flex items-center gap-2 text-sm transition-all"
      :class="props.side === 'front' ? 'left-3' : 'right-3'"
    >
      <UIcon v-if="side === 'front'" name="i-lucide-circle-help" size="16" />
      <UIcon
        v-if="side === 'back'"
        name="i-lucide-circle-check-big"
        size="16"
      />
      {{ prettyPrintSide }}
    </div>
    <div class="flex h-full items-center justify-center">
      <slot v-if="side === 'front'" name="front" />
      <slot v-if="side === 'back'" name="back" />
    </div>
  </div>
</template>

<style scoped></style>
