<script setup lang="ts">
import { useLanguage } from "@/composables/useLanguage";

const { languages, languageSelected } = useLanguage();
</script>

<template>
  <USelectMenu v-model="languageSelected" :options="languages" />
</template>
