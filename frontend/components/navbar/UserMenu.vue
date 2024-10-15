<script setup lang="ts">
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
  <div class="flex justify-between gap-2">
    <UDropdown v-model="open" :items="userItems">
      <UAvatar :src="avatar" alt="Avatar" />
    </UDropdown>
    <div class="flex gap-1">
      <NavbarLanguageSelector />
      <NavbarColorMode />
    </div>
  </div>
</template>
