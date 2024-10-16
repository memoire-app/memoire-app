<script setup lang="ts">
defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
});
const { t } = useI18n();
const avatar = useState("avatar") as Ref<string>;
const open = ref(false);

const router = useRouter();

const userItems = computed(() => [
  [
    {
      label: t("pages.profile.title"),
      avatar: {
        src: avatar.value as string,
      },
      click: () => router.push("/profile"),
    },
  ],
]);
</script>

<template>
  <div
    class="flex gap-2"
    :class="
      isMenuOpen ? 'flex-row justify-between' : 'flex-col items-center gap-4'
    "
  >
    <UDropdown v-model="open" :items="userItems">
      <UAvatar :src="avatar" alt="Avatar" />
    </UDropdown>
    <div
      class="flex"
      :class="isMenuOpen ? 'flex-row' : 'flex-col items-center gap-2 px-2'"
    >
      <NavbarLanguageSelector />
      <NavbarColorMode />
    </div>
  </div>
</template>
