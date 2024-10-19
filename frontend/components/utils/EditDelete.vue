<script setup lang="ts">
const emits = defineEmits(["delete", "edit"]);
</script>

<template>
  <div class="flex gap-2">
    <UButton
      icon="i-lucide-edit-2"
      size="xs"
      variant="ghost"
      class="h-fit"
      @click.stop="emits('edit')"
    />
    <UButton
      icon="i-lucide-trash"
      size="xs"
      color="red"
      variant="ghost"
      class="h-fit"
      @click.stop="emits('delete')"
    />
  </div>
</template>
