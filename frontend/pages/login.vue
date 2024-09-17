<script setup lang="ts">
const router = useRouter();

const runtimeConfig = useRuntimeConfig();

const authenticate = async (provider: string) => {
  try {
    // Check if user is already logged in
    const { checkAuth } = useAuth();

    if (await checkAuth()) {
      await router.push("/flashcards");
      return;
    }
  } catch {
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
  }
};

const colorMode = useColorMode();
const bg = computed(() => {
  return colorMode.value === "dark" ? "BG_DARK.png" : "BG_LIGHT.png";
});
</script>

<template>
  <div>
    <ClientOnly>
      <div
        :style="{ backgroundImage: `url(${bg})` }"
        class="fixed -z-50 h-full w-full bg-cover bg-center opacity-50"
      />
    </ClientOnly>

    <Navbar />
    <UContainer class="flex w-fit flex-col justify-center gap-4 pt-24 lg:pt-40">
      <UIcon name="i-heroicons-user-circle" size="34" />
      <span class="text-3xl font-bold">Se connecter</span>
      <span class="text-gray-500"
        >Connectez vous pour accéder à votre compte</span
      >
      <div
        class="flex w-full flex-col items-center justify-center gap-4 md:flex-row"
      >
        <UTooltip text="Se connecter avec Discord" class="w-full">
          <UButton
            icon="i-simple-icons-discord"
            block
            size="xl"
            class="flex flex-1 justify-center p-4"
            variant="soft"
            @click="authenticate('discord')"
          />
        </UTooltip>

        <UTooltip text="Se connecter avec GitHub" class="w-full">
          <UButton
            icon="i-simple-icons-github"
            block
            size="xl"
            square
            class="flex flex-1 justify-center p-4"
            variant="soft"
            @click="authenticate('github')"
          />
        </UTooltip>

        <UTooltip text="Se connecter avec Google" class="w-full">
          <UButton
            icon="i-simple-icons-google"
            block
            size="xl"
            square
            class="flex flex-1 justify-center p-4"
            variant="soft"
            @click="authenticate('google')"
          />
        </UTooltip>
      </div>
    </UContainer>
  </div>
</template>
