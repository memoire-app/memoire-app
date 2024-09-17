<!-- TabsGroup.vue -->
<script setup lang="ts">
import Tab from "~/components/tabs/Tab.vue";
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
      Mes decks
    </Tab>
    <Tab :active="activeTab === 1" @click="activeTab = 1">
      <template #icon>
        <UIcon name="i-lucide-chart-scatter" size="24" />
      </template>
      Dashboards
    </Tab>
  </div>
</template>
