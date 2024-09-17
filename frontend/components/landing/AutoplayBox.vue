<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
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
  isActive: {
    type: Boolean,
    required: true,
  },
});

const progress = ref(0);
let interval: NodeJS.Timeout;

onMounted(() => {
  watch(
    () => props.isActive,
    (newVal) => {
      if (newVal) {
        startProgress();
      } else {
        stopProgress();
        progress.value = 0;
      }
    },
  );

  if (props.isActive) {
    startProgress();
  }
});

onBeforeUnmount(() => {
  stopProgress();
});

const startProgress = () => {
  interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 1000) {
      stopProgress();
    }
  }, 50);
};

const stopProgress = () => {
  clearInterval(interval);
};
</script>

<template>
  <div
    class="flex flex-col gap-2 border border-neutral-200 px-8 py-6 transition-all hover:border-blue-500 dark:border-neutral-700 dark:hover:border-blue-500"
  >
    <div class="flex items-center gap-2">
      <span
        class="flex h-5 w-5 items-center justify-center bg-neutral-700 text-sm text-white dark:bg-neutral-100 dark:text-neutral-700"
        >{{ index }}</span
      >
      <span class="text-xl font-semibold">{{ title }}</span>
    </div>
    <span class="text-sm">{{ content }}</span>
    <UProgress
      :value="progress"
      :max="1000"
      class="hidden text-neutral-800 md:block"
    />
  </div>
</template>
