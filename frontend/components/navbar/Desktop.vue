<script setup lang="ts">
const { t } = useI18n();
const { isRouteActive } = useNavbar();

const isMenuOpen = ref(true);

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
  <div class="relative h-full">
    <UButton
      :class="isMenuOpen ? 'absolute right-2 top-3' : 'absolute right-6 top-3'"
      variant="ghost"
      :icon="isMenuOpen ? 'i-lucide-panel-left' : 'i-lucide-panel-left'"
      @click="isMenuOpen = !isMenuOpen"
    />
    <nav
      class="hidden h-full flex-col bg-slate-100 md:flex dark:bg-slate-800"
      :class="[isMenuOpen ? 'min-w-56 max-w-56' : 'w-20 justify-center p-0']"
    >
      <NavbarLogo v-if="isMenuOpen" />

      <div
        class="flex h-full flex-col justify-between py-4"
        :class="[isMenuOpen ? 'px-4' : 'mt-10 px-0']"
      >
        <div
          class="mt-8 flex flex-col gap-4"
          :class="[isMenuOpen ? '' : 'items-center']"
        >
          <UButton
            v-for="item in menuItems"
            :key="item.path"
            :class="[
              [isMenuOpen ? 'items-start' : 'w-fit justify-center'],
              [
                isRouteActive(item.path)
                  ? 'bg-white dark:bg-slate-700 dark:text-white'
                  : 'hover:bg-white dark:hover:bg-slate-700/50',
              ],
            ]"
            :icon="item.icon"
            :to="item.path"
            variant="ghost"
            color="black"
          >
            <template v-if="isMenuOpen">
              {{ item.label }}
            </template>
          </UButton>
        </div>
        <NavbarUserMenu :is-menu-open="isMenuOpen" />
      </div>
    </nav>
  </div>
</template>
