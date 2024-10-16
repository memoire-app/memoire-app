<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div class="flex justify-start px-6">
    <NuxtImg
      :src="colorMode.value === 'dark' ? '/lightmemoire.svg' : '/memoire.svg'"
      alt="logo"
      class="w-24 md:mt-4"
    />
  </div>
</template>
