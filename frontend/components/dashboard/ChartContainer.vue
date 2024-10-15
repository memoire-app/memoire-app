<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <UCard>
    <div class="text-sm font-semibold">
      {{ title }}
    </div>
    <slot />
  </UCard>
</template>
