<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div class="flex items-center justify-center">
    <NuxtImg
      :src="colorMode.value === 'dark' ? '/lightmemoire.svg' : '/memoire.svg'"
      alt="logo"
      class="w-24 md:mt-4"
    />
  </div>
</template>
