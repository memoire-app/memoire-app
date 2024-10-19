<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <UCard
    class="flex h-fit flex-1 flex-col border-t border-slate-100 shadow dark:border-slate-600 dark:bg-slate-800"
  >
    <div class="pb-4 text-sm font-semibold">
      {{ title }}
    </div>
    <div class="flex flex-1 justify-center">
      <slot />
    </div>
  </UCard>
</template>
