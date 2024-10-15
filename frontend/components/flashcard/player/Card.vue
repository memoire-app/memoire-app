<script setup lang="ts">
const { t } = useI18n();
const props = defineProps<{
  side: "front" | "back";
}>();

const prettyPrintSide = computed(() => {
  return props.side === "front" ? "Question" : t("flashcards.answer");
});
</script>

<template>
  <div
    class="relative flex h-[400px] w-full flex-col overflow-auto rounded"
    :class="
      props.side === 'front'
        ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200'
        : 'bg-neutral-700 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-700'
    "
  >
    <div
      class="relative flex min-h-12 w-full items-center gap-2 text-sm transition-all"
    >
      <div
        class="absolute flex items-center gap-2"
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
    </div>
    <div class="flex flex-1 items-center justify-center overflow-clip px-2">
      <slot v-if="side === 'front'" name="front" />
      <slot v-if="side === 'back'" name="back" />
    </div>
  </div>
</template>

<style scoped></style>
