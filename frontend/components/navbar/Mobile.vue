<script setup lang="ts">
import { useNavbar } from "@/composables/useNavbar";

const { toggleMenu } = useNavbar();
</script>

<template>
  <nav
    class="fixed z-10 flex w-full items-center justify-between py-2 pr-4 backdrop-blur-xl md:hidden dark:bg-slate-800/30"
  >
    <NavbarLogo />
    <div class="flex items-center gap-2">
      <NavbarLanguageSelector />
      <NavbarColorMode />
      <UButton icon="i-mdi-menu" variant="ghost" @click="toggleMenu" />
    </div>
  </nav>
</template>
