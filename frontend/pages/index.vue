<script setup lang="ts">
const colorMode = useColorMode();
const bg = computed(() => {
  return colorMode.value === "dark" ? "BG_DARK.png" : "BG_LIGHT.png";
});

const FEATURES = [
  {
    title: "Crée ton deck de cartes",
    content: "🔖 D'un côté la question, de l'autre la réponse",
  },
  {
    title: "Révise efficacement",
    content: "📚 Révise tes cours de manière efficace et ludique",
  },
  {
    title: "Partage tes decks",
    content: "😎 Partage tes decks avec tes amis et toute la communauté",
  },
  {
    title: "Des nouveautés à découvrir",
    content: "✨ De belles choses vont arriver, reste connecté",
  },
];

const QUESTIONS = [
  {
    label: "Comment créer un deck ?",
    content:
      "Il suffit de se connecter et de cliquer sur le bouton 'Créer un deck'.",
  },
  {
    label: "Mes decks sont-ils accessibles par tout le monde ?",
    content:
      "Non. Par défaut, vos decks sont privés. Vous pouvez les partager avec vos amis ou la communauté si vous le souhaitez.",
  },
  {
    label: "Comment utiliser les decks partagés ?",
    content:
      "Une fois que vous avez trouvé un deck partagé, vous pouvez l'ajouter à votre collection et l'utiliser comme bon vous semble.",
  },
];

const activeIndex = ref(0); // This will track the active box

// Function to set the active index when hovering
const setActive = (index: number) => {
  activeIndex.value = index;
};

// Function to clear the active index (optional, if you want to revert back)
const clearActive = () => {
  activeIndex.value = -1; // -1 means no box is active
};
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
    <UContainer>
      <UContainer
        class="flex w-full flex-col items-center justify-center gap-4 pt-24 text-center md:pt-48"
      >
        <div
          class="rounded-3xl border border-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300"
        >
          ✨ Rejoins l'aventure dès maintenant
        </div>

        <h1 class="text-4xl font-bold lg:text-6xl">
          Révise efficacement grâce aux flashcards
        </h1>
        <h3 class="max-w-[500px] pt-2 text-gray-500">
          Crée des decks de cartes, entraine-toi et découvre d'autres decks
          créés par la communauté
        </h3>
        <UButton class="mt-8" to="/login" size="lg" icon="i-lucide-badge-plus">
          Créer un deck
        </UButton>
      </UContainer>

      <div class="mt-48 hidden justify-center md:flex">
        <NuxtImg src="/FLASHCARDS.png" alt="hero" class="w-4/5" />
      </div>

      <UContainer
        id="features"
        class="flex w-full flex-col items-center justify-center gap-12 py-16 lg:gap-20 lg:py-24"
      >
        <span class="bg-primary h-24 w-1 lg:h-72" />
        <span
          class="text-center text-3xl font-bold lg:text-5xl"
          :style="{ lineHeight: '1.5' }"
          >Pourquoi utiliser
          <span
            class="rounded-lg border border-dashed border-blue-300 bg-blue-50 px-3 py-1 text-3xl lg:text-5xl dark:border-blue-950 dark:bg-blue-900"
            >memoire</span
          >
          ?
        </span>
        <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div class="flex w-full flex-col gap-8 lg:w-3/5">
            <LandingAutoplayBox
              v-for="(feature, i) in FEATURES"
              :key="feature.title"
              :title="feature.title"
              :content="feature.content"
              :index="i + 1"
              :is-active="i === activeIndex"
              @mouseenter="setActive(i)"
              @mouseleave="clearActive"
            />
          </div>
          <div class="lg:w-2/5">
            <img
              src="/SCREEN.png"
              alt="hero"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </UContainer>

      <UContainer
        class="flex w-full flex-col items-center justify-center gap-12 py-20 lg:gap-20 lg:py-32"
      >
        <span class="text-center text-3xl font-bold lg:text-5xl"
          >Questions fréquentes</span
        >
        <UAccordion size="xl" multiple :items="QUESTIONS" />
      </UContainer>

      <UContainer
        id="contact"
        class="lg:gap-16lg:py-32 flex w-full flex-col items-center justify-center gap-12 py-20"
      >
        <span class="text-center text-3xl font-bold lg:text-5xl">Contact</span>
        <div class="flex flex-col gap-2">
          <div>
            memoire est un projet open-source, disponible sur
            <UtilsHighlightedWord>
              <NuxtLink to="https://github.com/memoire-app" target="_blank"
                >GitHub</NuxtLink
              >
            </UtilsHighlightedWord>
            et en libre accès.
          </div>
          <div>
            Tu peux également rejoindre le
            <UtilsHighlightedWord
              ><NuxtLink to="https://discord.gg/CcqzXXJfvm" target="_blank"
                >Discord</NuxtLink
              ></UtilsHighlightedWord
            >
            Studoby qui est un serveur communautaire dédié à l'informatique,
            l'éducation et pleins d'autres choses.
          </div>
        </div>
      </UContainer>
    </UContainer>
    <LandingFooter />
  </div>
</template>
