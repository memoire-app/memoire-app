<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <UCard>
    <div class="pb-4 text-sm font-semibold">
      {{ title }}
    </div>
    <div class="flex justify-center">
      <slot />
    </div>
  </UCard>
</template>
