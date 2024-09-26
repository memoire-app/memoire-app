<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-1 flex-col justify-between gap-2 border border-neutral-200 px-8 py-6 transition-all hover:border-blue-500 dark:border-neutral-700 dark:hover:border-blue-500"
  >
    <div class="flex items-center gap-2">
      <span
        class="flex h-5 w-5 items-center justify-center bg-neutral-700 text-sm text-white dark:bg-neutral-100 dark:text-neutral-700"
        >{{ index }}</span
      >
      <span class="text-xl font-semibold">{{ title }}</span>
    </div>
    <span class="text-sm">{{ content }}</span>
  </div>
</template>
