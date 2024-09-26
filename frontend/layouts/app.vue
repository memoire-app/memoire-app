<script setup lang="ts">
import ColorMode from "~/components/navbar/ColorMode.vue";
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const headers = useRequestHeaders();
const isLogoutOpen = ref(false);
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

const isMenuOpen = ref(false);
const isHelpOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const avatar = useState("avatar");
const colorMode = useColorMode();
const logo = computed(() => {
  return colorMode.value === "dark" ? "lightmemoire.svg" : "memoire.svg";
});

const goTo = (path: string) => {
  router.push("/" + path);
  isMenuOpen.value = false;
};

const isRouteActive = (path: string) => {
  // Check if the path contains the current route
  return router.currentRoute.value.path.includes(path);
};

const items = [
  [
    {
      label: "Profil",
      avatar: {
        src: avatar.value as string,
      },
      click: () => {
        router.push("/profile");
      },
    },
  ],
  [
    {
      label: "Déconnexion",
      icon: "i-lucide-log-out",
      iconClass: "dark:bg-white bg-red-500",
      class: "text-red-500 bg-red-50 dark:bg-red-500",
      click: () => {
        isLogoutOpen.value = true;
      },
    },
  ],
];

const open = ref(true);
</script>

<template>
  <div>
    <div class="flex h-screen">
      <nav
        class="hidden min-w-56 max-w-56 flex-col pt-3 md:flex dark:bg-neutral-900"
      >
        <ClientOnly>
          <NuxtImg
            :src="logo"
            alt="Logo"
            width="100"
            class="m-auto flex items-center pt-2"
          />
        </ClientOnly>
        <div class="flex h-full flex-col justify-between px-4 py-4">
          <div class="mt-8 flex flex-col gap-4">
            <UButton
              :class="[
                isRouteActive('/flashcards')
                  ? 'bg-neutral-100 dark:bg-neutral-800 dark:text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
              ]"
              icon="i-cbi-garbage-cardboard"
              to="/flashcards"
              variant="ghost"
              color="black"
              >Flashcards</UButton
            >
            <UButton
              :class="[
                isRouteActive('/explore')
                  ? 'bg-neutral-100 dark:bg-neutral-800 dark:text-white'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
              ]"
              class=""
              icon="i-heroicons-magnifying-glass"
              to="/explore"
              variant="ghost"
              color="black"
              >Explorer</UButton
            >
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between gap-2">
              <UDropdown v-model="open" :items="items">
                <UAvatar :src="avatar as string" alt="Avatar" />
              </UDropdown>

              <div class="flex gap-1">
                <ColorMode />
                <UTooltip text="Aide">
                  <UButton
                    icon="i-lucide-badge-help"
                    variant="ghost"
                    @click="isHelpOpen = true"
                  />
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav
        class="fixed z-10 flex w-full items-center justify-between p-2 px-4 backdrop-blur-xl md:hidden dark:bg-neutral-800/30"
      >
        <ClientOnly>
          <NuxtImg :src="logo" alt="Logo" class="flex w-20 justify-center" />
        </ClientOnly>
        <div class="flex items-center gap-2">
          <ColorMode />
          <UButton
            icon="i-lucide-badge-help"
            variant="ghost"
            @click="isHelpOpen = true"
          />
          <UButton icon="i-mdi-menu" variant="soft" @click="toggleMenu" />
        </div>
      </nav>

      <div
        class="flex h-full w-full flex-col bg-neutral-100 pt-6 md:pt-2 dark:bg-neutral-800"
      >
        <div class="overflow-auto px-6 py-8 md:px-14">
          <slot />
        </div>
      </div>
    </div>

    <UModal v-model="isLogoutOpen" class="p-4">
      <div class="flex w-full flex-col gap-3 p-4">
        <label class="text-lg">Déconnexion</label>
        <span class="text-sm">Êtes-vous sûr de vouloir vous déconnecter ?</span>
        <div class="flex justify-end gap-2">
          <UButton color="gray" variant="ghost" @click="isLogoutOpen = false"
            >Annuler</UButton
          >
          <UButton color="red" icon="i-lucide-log-out" @click="logout"
            >Se déconnecter</UButton
          >
        </div>
      </div>
    </UModal>

    <USlideover v-model="isHelpOpen">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute end-5 top-3 z-10 flex sm:hidden"
        square
        padded
        @click="isHelpOpen = false"
      />
      <div class="flex w-full flex-col gap-3 p-4">
        <label class="text-lg">Aide</label>
        <span class="flex flex-col gap-2 text-sm">
          <div>
            memoire est un projet open-source, disponible sur
            <UtilsHighlightedWord>
              <NuxtLink to="https://github.com/memoire-app" target="_blank"
                >GitHub</NuxtLink
              >
            </UtilsHighlightedWord>
            et en libre accès.
          </div>
          <UDivider />
          <div>
            Tu peux également rejoindre le
            <UtilsHighlightedWord
              ><NuxtLink to="https://discord.gg/CcqzXXJfvm" target="_blank"
                >Discord</NuxtLink
              ></UtilsHighlightedWord
            >
            Studoby qui est un serveur communautaire dédié à l'informatique,
            l'éducation et plein d'autres choses.
          </div>
        </span>
      </div>
    </USlideover>

    <!-- Mobile Nav -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-50 flex flex-col bg-white pt-20 dark:bg-neutral-900"
    >
      <UButton
        icon="i-mdi-close"
        class="absolute right-4 top-2"
        variant="soft"
        @click="closeMenu"
      />
      <div class="flex flex-col items-center gap-4 px-8 text-center">
        <UButton
          size="lg"
          variant="soft"
          block
          icon="i-cbi-garbage-cardboard"
          @click="goTo('flashcards')"
        >
          <span>Flashcards</span>
        </UButton>
        <UButton
          size="lg"
          variant="soft"
          block
          icon="i-heroicons-magnifying-glass"
          @click="goTo('explore')"
        >
          <span>Explorer</span>
        </UButton>
        <UButton
          class="mt-8"
          icon="i-lucide-log-out"
          variant="soft"
          color="red"
          block
          size="lg"
          @click="isLogoutOpen = true"
        >
          <span>Se déconnecter</span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
