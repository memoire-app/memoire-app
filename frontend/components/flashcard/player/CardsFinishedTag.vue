<script setup lang="ts">
defineProps<{
  nbFinished: number;
  total: number;
}>();
</script>

<template>
  <div
    class="flex w-fit items-center gap-2 rounded-2xl bg-green-700 px-3 py-0.5 text-sm text-green-100"
  >
    <UIcon name="i-lucide-circle-check-big" size="16" />
    <span> {{ nbFinished }} terminée(s) sur {{ total }} </span>
  </div>
</template>

<style scoped></style>
