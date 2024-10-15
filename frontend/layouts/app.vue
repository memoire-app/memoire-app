<script setup lang="ts">
import { useNavbar } from "@/composables/useNavbar";

const { isMenuOpen } = useNavbar();
</script>

<template>
  <div class="flex h-screen">
    <NavbarDesktop />
    <NavbarMobile />

    <div
      class="flex h-full w-full flex-col bg-white pt-6 md:pt-2 dark:bg-neutral-800"
    >
      <div class="overflow-auto px-6 py-8 md:px-14">
        <slot />
      </div>
    </div>

    <NavbarMobileMenu v-if="isMenuOpen" :is-landing="false" />
  </div>
</template>
