<script setup lang="ts">
const { t } = useI18n();
const { isRouteActive } = useNavbar();

const menuItems = computed(() => [
  {
    path: "/flashcards",
    label: t("pages.flashcards.title"),
    icon: "i-cbi-garbage-cardboard",
  },
  {
    path: "/dashboards",
    label: t("pages.dashboards.title"),
    icon: "i-lucide-chart-scatter",
  },
  {
    path: "/explore",
    label: t("pages.explore.title"),
    icon: "i-heroicons-magnifying-glass",
  },
]);
</script>

<template>
  <nav
    class="hidden min-w-56 max-w-56 flex-col bg-neutral-100 pt-3 md:flex dark:bg-neutral-900"
  >
    <NavbarLogo />
    <div class="flex h-full flex-col justify-between px-4 py-4">
      <div class="mt-8 flex flex-col gap-4">
        <UButton
          v-for="item in menuItems"
          :key="item.path"
          :class="[
            isRouteActive(item.path)
              ? 'bg-white dark:bg-neutral-800 dark:text-white'
              : 'hover:bg-white dark:hover:bg-neutral-800/50',
          ]"
          :icon="item.icon"
          :to="item.path"
          variant="ghost"
          color="black"
          >{{ item.label }}</UButton
        >
      </div>
      <NavbarUserMenu />
    </div>
  </nav>
</template>
