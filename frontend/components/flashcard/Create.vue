<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <button
    class="hover:bg-primary flex h-52 flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 transition-all duration-300 hover:text-white dark:border-slate-300"
  >
    <UIcon name="i-lucide-circle-plus" size="32" />
    {{ t("flashcards.createCard") }}
  </button>
</template>

<style scoped></style>
