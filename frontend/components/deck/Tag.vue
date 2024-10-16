<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <UBadge class="w-fit text-xs" color="gray">
    {{ tag }}
  </UBadge>
</template>
