<script setup lang="ts">
import { ref, computed } from "vue";
import NavLink from "~/components/navbar/NavLink.vue";
import MobileMenu from "~/components/navbar/MobileMenu.vue";
import ColorMode from "~/components/navbar/ColorMode.vue";
import { useLanguage } from "~/composables/useLanguage";
const { t } = useI18n();
const { languages, languageSelected } = useLanguage();

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const colorMode = useColorMode();
const logo = computed(() => {
  return colorMode.value === "dark" ? "lightmemoire.svg" : "memoire.svg";
});
</script>

<template>
  <nav class="mb-4 hidden w-full md:fixed md:block">
    <UContainer
      class="flex w-full items-center justify-between bg-white/30 py-3 backdrop-blur-xl dark:bg-neutral-800/30"
    >
      <div class="w-1/5">
        <ClientOnly>
          <NuxtImg :src="logo" alt="Logo" class="flex w-20 justify-center" />
        </ClientOnly>
      </div>
      <div class="flex gap-4">
        <NavLink to="/#features" text="Features" />
        <NavLink to="/#contact" text="Contact" />
      </div>
      <div class="flex w-1/5 items-center justify-end gap-2">
        <USelectMenu v-model="languageSelected" :options="languages" />
        <ColorMode />
        <UButton size="sm" to="/login" variant="soft" icon="i-mdi-login">
          <span>{{ t("utils.login") }}</span>
        </UButton>
      </div>
    </UContainer>
  </nav>

  <!-- Mobile Nav -->
  <nav
    class="fixed mb-4 flex w-full items-center justify-between p-2 px-4 backdrop-blur-xl md:hidden dark:bg-neutral-800/30"
  >
    <ClientOnly>
      <NuxtImg :src="logo" alt="Logo" class="flex w-20 justify-center" />
    </ClientOnly>
    <div class="flex items-center gap-2">
      <ColorMode />
      <UButton icon="i-mdi-menu" variant="soft" @click="toggleMenu" />
    </div>
  </nav>

  <!-- Full-Screen Mobile Menu -->
  <MobileMenu v-if="isMenuOpen" @close-menu="closeMenu" />
</template>
