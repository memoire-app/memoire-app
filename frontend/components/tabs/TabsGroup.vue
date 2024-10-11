<!-- TabsGroup.vue -->
<script setup lang="ts">
import Tab from "~/components/tabs/Tab.vue";
const { t } = useI18n();
// Track the active tab
const activeTab = defineModel("activeTab", {
  type: Number,
  default: 0,
});
</script>

<template>
  <div class="flex text-sm">
    <Tab :active="activeTab === 0" @click="activeTab = 0">
      <template #icon>
        <UIcon name="i-heroicons-user-circle" size="24" />
      </template>
      {{ t("pages.flashcards.myDecks") }}
    </Tab>
    <Tab :active="activeTab === 1" @click="activeTab = 1">
      <template #icon>
        <UIcon name="i-lucide-chart-scatter" size="24" />
      </template>
      {{ t("pages.flashcards.dashboards") }}
    </Tab>
  </div>
</template>
