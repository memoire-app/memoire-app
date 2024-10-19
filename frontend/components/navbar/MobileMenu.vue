<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNavbar } from "@/composables/useNavbar";

defineProps<{
  isLanding: boolean;
}>();

const { t } = useI18n();
const { closeMenu, goTo } = useNavbar();

const menuItems = computed(() => [
  {
    path: "flashcards",
    label: t("pages.flashcards.title"),
    icon: "i-cbi-garbage-cardboard",
  },
  {
    path: "dashboards",
    label: t("pages.dashboards.title"),
    icon: "i-lucide-chart-scatter",
  },
  {
    path: "explore",
    label: t("pages.explore.title"),
    icon: "i-heroicons-magnifying-glass",
  },
  {
    path: "profile",
    label: t("pages.profile.title"),
    icon: "i-heroicons-user",
  },
]);

const menuItemsLanding = computed(() => [
  {
    path: "login",
    label: t("login.title"),
    icon: "i-mdi-login",
  },
]);
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex flex-col bg-white pt-20 dark:bg-slate-900"
  >
    <UButton
      icon="i-mdi-close"
      class="absolute right-4 top-2"
      variant="ghost"
      @click="closeMenu"
    />
    <div
      v-if="isLanding"
      class="flex flex-col items-center gap-4 px-8 text-center"
    >
      <UButton
        v-for="item in menuItemsLanding"
        :key="item.path"
        size="lg"
        block
        :icon="item.icon"
        @click="goTo(item.path)"
      >
        <span>{{ item.label }}</span>
      </UButton>
    </div>
    <div v-else class="flex flex-col items-center gap-4 px-8 text-center">
      <UButton
        v-for="item in menuItems"
        :key="item.path"
        size="lg"
        block
        :icon="item.icon"
        @click="goTo(item.path)"
      >
        <span>{{ item.label }}</span>
      </UButton>
    </div>
  </div>
</template>
