<script setup lang="ts">
const { t } = useI18n();

defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div class="flex text-sm">
    <UTooltip :text="t('utils.lastUpdate')" class="flex items-center gap-1">
      <UIcon name="i-lucide-calendar" size="sm" />
      <span>{{ new Date(date).toLocaleDateString("fr") }}</span>
    </UTooltip>
  </div>
</template>
