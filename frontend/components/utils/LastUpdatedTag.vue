<script setup lang="ts">
defineProps({
  date: {
    type: Date,
    required: true,
  },
  tooltip: {
    type: String,
    default: "Dernière update",
  },
});
</script>

<template>
  <div class="flex text-sm">
    <UTooltip :text="tooltip" class="flex items-center gap-1">
      <UIcon name="i-lucide-calendar" size="sm" />
      <span>{{ new Date(date).toLocaleDateString("fr") }}</span>
    </UTooltip>
  </div>
</template>
