<!-- Tab.vue -->
<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="duration-400 flex gap-2 px-4 py-2 text-center transition-all ease-in-out"
    :class="{ 'border-primary border-b-2': active, 'border-b-2': !active }"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<style scoped>
/* Your styles here */
</style>
