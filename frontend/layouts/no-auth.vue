<script setup lang="ts">
import NavLink from "~/components/navbar/NavLink.vue";
import MobileMenu from "~/components/navbar/MobileMenu.vue";
import ColorMode from "~/components/navbar/ColorMode.vue";
import { useLanguage } from "~/composables/useLanguage";
const { t } = useI18n();
const { languages, languageSelected } = useLanguage();

const { isMenuOpen, toggleMenu, closeMenu } = useNavbar();

const colorMode = useColorMode();
const logo = computed(() => {
  return colorMode.value === "dark" ? "lightmemoire.svg" : "memoire.svg";
});
</script>

<template>
  <div>
    <nav class="z-10 mb-4 hidden w-full px-4 md:fixed md:block">
      <UContainer
        class="mt-4 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white/50 py-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/30"
      >
        <div class="w-1/5">
          <ClientOnly>
            <NuxtImg :src="logo" alt="Logo" class="flex w-20 justify-center" />
          </ClientOnly>
        </div>
        <div class="flex gap-4">
          <NavLink to="/#features" :text="t('landing.nav.features')" />
          <NavLink to="/#contact" :text="t('landing.nav.contact')" />
        </div>
        <div class="flex w-1/5 items-center justify-end gap-2">
          <USelectMenu
            v-model="languageSelected"
            :options="languages"
            color="gray"
          />
          <ColorMode />
          <UButton size="sm" to="/login" variant="soft" icon="i-mdi-login">
            <span>{{ t("login.title") }}</span>
          </UButton>
        </div>
      </UContainer>
    </nav>

    <!-- Mobile Nav -->
    <nav
      class="fixed mb-4 flex w-full items-center justify-between p-2 px-4 backdrop-blur-xl md:hidden dark:bg-slate-800/30"
    >
      <ClientOnly>
        <NuxtImg :src="logo" alt="Logo" class="flex w-20 justify-center" />
      </ClientOnly>
      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="languageSelected"
          :options="languages"
          color="gray"
        />

        <ColorMode />
        <UButton icon="i-mdi-menu" variant="ghost" @click="toggleMenu" />
      </div>
    </nav>

    <!-- Full-Screen Mobile Menu -->
    <MobileMenu v-if="isMenuOpen" is-landing @close-menu="closeMenu" />

    <slot />
  </div>
</template>
