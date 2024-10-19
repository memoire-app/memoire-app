<script setup lang="ts">
definePageMeta({
  layout: "no-auth",
});
const { t } = useI18n();
const router = useRouter();

const runtimeConfig = useRuntimeConfig();

const authenticate = async (provider: string) => {
  const res = await $fetch(`${provider}/redirect`, {
    baseURL: runtimeConfig.public.BACK_URL as string,
  });

  switch (provider) {
    case "discord":
      window.location.href = `${res.url}&prompt=none`;
      break;
    case "google":
      window.location.href = `${res.url}&prompt=consent`;
      break;
    case "github":
      window.location.href = res.url;
      break;
  }
};

const colorMode = useColorMode();
const bg = computed(() => {
  return colorMode.value === "dark" ? "BG_DARK.png" : "BG_LIGHT.png";
});

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isRegister = ref(false);
const toast = useToast();

const login = async () => {
  try {
    await $fetch("login", {
      baseURL: runtimeConfig.public.BACK_URL as string,
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    await router.push("/flashcards");
  } catch {
    toast.add({
      title: t("login.invalid"),
      icon: "i-lucide-bug",
      color: "red",
    });
  }
};

const register = async () => {
  try {
    // Make sure the passwords match
    if (password.value !== confirmPassword.value) {
      toast.add({
        title: t("register.passwordMismatch"),
        icon: "i-lucide-bug",
        color: "red",
      });
      return;
    }
    await $fetch("register", {
      baseURL: runtimeConfig.public.BACK_URL as string,
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    await router.push("/flashcards");
  } catch {
    return router.push("/login");
  }
};

// Define the items for the tabs
const items = computed(() => [
  {
    key: "login",
    label: t("login.title"),
    description: t("login.description"),
  },
  {
    key: "register",
    label: t("register.title"),
    description: t("register.description"),
  },
]);
</script>

<template>
  <div>
    <div
      :style="{ backgroundImage: `url(${bg})` }"
      class="fixed -z-50 h-full w-full bg-cover bg-center opacity-50"
    />

    <UContainer
      class="flex w-fit min-w-96 flex-col justify-center gap-4 pt-24 md:pt-40 lg:min-w-[600px]"
    >
      <UTabs v-model:active="isRegister" :items="items" class="w-full">
        <template #item="{ item }">
          <UCard @submit.prevent="item.key === 'login' ? login() : register()">
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </p>
            </template>

            <div v-if="item.key === 'login'" class="space-y-3">
              <UFormGroup :label="t('utils.email')" name="email" required>
                <UInput
                  v-model="email"
                  type="email"
                  :placeholder="t('utils.email')"
                  icon="i-lucide-mail"
                  required
                  class="mb-4 w-full"
                />
              </UFormGroup>
              <UFormGroup :label="t('utils.password')" name="password" required>
                <UInput
                  v-model="password"
                  type="password"
                  :placeholder="t('utils.password')"
                  icon="i-heroicons-lock-closed"
                  required
                  class="mb-4 w-full"
                />
              </UFormGroup>
            </div>

            <div v-else-if="item.key === 'register'" class="space-y-3">
              <UFormGroup :label="t('utils.email')" name="email" required>
                <UInput
                  v-model="email"
                  type="email"
                  :placeholder="t('utils.email')"
                  icon="i-lucide-mail"
                  required
                  class="mb-4 w-full"
                />
              </UFormGroup>
              <UFormGroup :label="t('utils.password')" name="password" required>
                <UInput
                  v-model="password"
                  type="password"
                  :placeholder="t('utils.password')"
                  icon="i-heroicons-lock-closed"
                  required
                  class="mb-4 w-full"
                />
              </UFormGroup>
              <UFormGroup
                :label="t('register.confirmPassword')"
                name="confirmPassword"
                required
              >
                <UInput
                  v-model="confirmPassword"
                  type="password"
                  :placeholder="t('register.confirmPassword')"
                  icon="i-heroicons-lock-closed"
                  required
                  class="mb-4 w-full"
                />
              </UFormGroup>
            </div>

            <template #footer>
              <UButton
                type="submit"
                block
                size="xl"
                :icon="
                  item.key === 'login' ? 'i-mdi-login' : 'i-lucide-badge-plus'
                "
              >
                {{
                  item.key === "login" ? t("login.title") : t("register.title")
                }}
              </UButton>
            </template>
          </UCard>
        </template>
      </UTabs>

      <UDivider :label="t('utils.or').toUpperCase()" />
      <div
        class="flex w-full flex-col items-center justify-center gap-4 md:flex-row"
      >
        <UTooltip
          :text="t('utils.loginWith', { provider: 'Discord' })"
          class="w-full"
        >
          <UButton
            icon="i-simple-icons-discord"
            block
            size="xl"
            class="flex flex-1 justify-center p-4"
            variant="outline"
            @click="authenticate('discord')"
          />
        </UTooltip>

        <UTooltip
          :text="t('utils.loginWith', { provider: 'Github' })"
          class="w-full"
        >
          <UButton
            icon="i-simple-icons-github"
            block
            size="xl"
            square
            class="flex flex-1 justify-center p-4"
            variant="outline"
            @click="authenticate('github')"
          />
        </UTooltip>

        <UTooltip
          :text="t('utils.loginWith', { provider: 'Google' })"
          class="w-full"
        >
          <UButton
            icon="i-simple-icons-google"
            block
            size="xl"
            square
            class="flex flex-1 justify-center p-4"
            variant="outline"
            @click="authenticate('google')"
          />
        </UTooltip>
      </div>
    </UContainer>
  </div>
</template>
