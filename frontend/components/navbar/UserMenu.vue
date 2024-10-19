<script setup lang="ts">
defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
});
const avatar = useState("avatar") as Ref<string>;
</script>

<template>
  <div
    class="flex items-center gap-2"
    :class="
      isMenuOpen ? 'flex-row justify-between' : 'flex-col items-center gap-4'
    "
  >
    <NuxtLink to="/profile">
      <UAvatar :src="avatar" alt="Avatar" />
    </NuxtLink>
    <div
      class="flex gap-2"
      :class="isMenuOpen ? 'flex-row' : 'flex-col items-center px-2'"
    >
      <NavbarLanguageSelector />
      <NavbarColorMode />
    </div>
  </div>
</template>
