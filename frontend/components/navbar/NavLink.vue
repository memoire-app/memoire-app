<script setup lang="ts">
import type { PropType } from "vue";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

defineProps({
  to: { type: String, required: true },
  text: { type: String, required: true },
  icon: { type: String, default: "" },
  size: { type: String as PropType<ButtonSize>, default: "md" },
});
</script>

<template>
  <ULink :to="to" inactive-class="text-gray-5 transition-all">
    <UButton
      :size="size"
      :icon="icon"
      class="hover:bg-gray-100 dark:hover:bg-slate-700"
      color="black"
      variant="ghost"
    >
      {{ text }}
    </UButton>
  </ULink>
</template>

<style scoped></style>
