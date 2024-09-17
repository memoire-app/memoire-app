<script setup lang="ts">
import type { UserAPI } from "~/models";

definePageMeta({
  layout: "app",
  middleware: "auth",
});
const router = useRouter();
const user = useState<UserAPI>("user");
const isLogoutOpen = ref(false);
const runtimeConfig = useRuntimeConfig();
const headers = useRequestHeaders();

const logout = async () => {
  const res = await $fetch(`/logout`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
    headers,
    credentials: "include",
  });
  if (res) {
    await router.push("/");
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <div>
        <UAvatar size="xl" :src="user.avatar as string" />
        <span> {{ user.username }}</span>
      </div>
      <UButton
        icon="i-lucide-log-out"
        class="w-fit"
        color="red"
        @click="isLogoutOpen = true"
      >
        Se déconnecter
      </UButton>
    </div>
    <UModal v-model="isLogoutOpen" class="p-4">
      <div class="flex w-full flex-col gap-3 p-4">
        <label class="text-lg">Déconnexion</label>
        <span class="text-sm">Êtes-vous sûr de vouloir vous déconnecter ?</span>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="isLogoutOpen = false"
            >Annuler</UButton
          >
          <UButton icon="i-lucide-log-out" color="red" @click="logout"
            >Se déconnecter</UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</template>
