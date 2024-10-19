<script setup lang="ts">
import type { UserAPI } from "~/models";
const { t } = useI18n();
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

const username = ref(user.value.memoireUsername ?? "");
const toast = useToast();
const changeUsername = async (username: string) => {
  try {
    const res = await $fetch(`/profile`, {
      baseURL: runtimeConfig.public.BACK_URL as string,
      headers,
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({ memoireUsername: username.trim() }),
    });

    if (res) {
      user.value.memoireUsername = username;
      toast.add({
        title: t("utils.usernameUpdated"),
        icon: "i-lucide-check",
        color: "green",
      });
    }
  } catch {
    username = "";
    toast.add({
      title: t("utils.usernameUnique"),
      icon: "i-lucide-bug",
      color: "red",
    });
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-4">
        <UAvatar size="3xl" :src="user.avatar!" />
        <span> {{ user.email }}</span>

        <UFormGroup :label="t('utils.username')">
          <div class="flex flex-col gap-2 md:flex-row">
            <UInput
              v-model="username"
              placeholder="Username"
              class="w-fit min-w-40"
              maxlength="45"
            />
            <UButton
              icon="i-lucide-check"
              class="w-fit"
              @click="changeUsername(username)"
            >
              {{ t("utils.save") }}
            </UButton>
          </div>
        </UFormGroup>
      </div>
      <UButton
        icon="i-lucide-log-out"
        class="mt-6 w-fit"
        color="red"
        @click="isLogoutOpen = true"
      >
        {{ t("utils.logout") }}
      </UButton>
    </div>
    <UModal v-model="isLogoutOpen" class="p-4">
      <div class="flex w-full flex-col gap-3 p-4">
        <label class="text-lg">{{ t("utils.logout_name") }}</label>
        <span class="text-sm">{{ t("utils.logout_confirm") }}</span>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="isLogoutOpen = false">{{
            t("utils.cancel")
          }}</UButton>
          <UButton icon="i-lucide-log-out" color="red" @click="logout">{{
            t("utils.logout")
          }}</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
