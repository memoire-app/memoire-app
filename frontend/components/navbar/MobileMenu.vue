<script setup lang="ts">
const emit = defineEmits(["closeMenu"]);

const closeMenu = () => {
  emit("closeMenu");
};
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col bg-white pt-12 dark:bg-slate-950"
  >
    <UButton
      icon="i-mdi-close"
      class="absolute right-4 top-2"
      variant="soft"
      @click="closeMenu"
    />
    <div class="flex flex-col items-center gap-4 text-center">
      <UButton
        size="lg"
        to="/login"
        variant="soft"
        class="w-fit"
        icon="i-mdi-login"
      >
        <span>Se connecter</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
