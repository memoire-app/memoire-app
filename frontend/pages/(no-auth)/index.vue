<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, tm, locale } = useI18n();

const colorMode = useColorMode();
const bg = computed(() => {
  return colorMode.value === "dark" ? "BG_DARK.png" : "BG_LIGHT.png";
});

const FEATURES = ref(
  tm("landing.features") as { title: string; content: string }[],
);
const QUESTIONS = ref(
  tm("landing.questions") as { title: string; content: string }[],
);

const activeIndex = ref(0);

// Function to set the active index when hovering
const setActive = (index: number) => {
  activeIndex.value = index;
};

// Function to clear the active index (optional, if you want to revert back)
const clearActive = () => {
  activeIndex.value = -1;
};

// Check if locale change and update the FEATURES abd QUESTIONS
watch(
  () => locale.value,
  () => {
    FEATURES.value = tm("landing.features");
    QUESTIONS.value = tm("landing.questions");
  },
);
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
          class="rounded-3xl border border-neutral-200 px-3 py-1 text-sm text-neutral-700 transition-all dark:text-neutral-300"
          to="/login"
        >
          ✨ {{ t("landing.welcome") }}
        </div>
        <h1 class="text-4xl font-bold lg:text-6xl">
          {{ t("landing.study") }}
        </h1>
        <h3 class="max-w-[500px] pt-2 text-gray-500">
          {{ t("landing.subtitle") }}
        </h3>
        <UButton class="mt-8" to="/login" size="xl" icon="i-lucide-badge-plus">
          {{ t("landing.create") }}
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
          class="inline-flex items-center gap-3 text-center text-3xl font-bold lg:text-5xl"
          :style="{ lineHeight: '1.5' }"
        >
          {{ t("landing.why") }}
          <NuxtImg
            :src="
              colorMode.value === 'dark' ? '/lightmemoire.svg' : '/memoire.svg'
            "
            alt="logo"
            class="inline-block h-40 w-40"
          />
          ?
        </span>

        <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div class="flex w-full flex-1 flex-col gap-8 lg:w-3/5">
            <LandingAutoplayBox
              v-for="(feature, i) in FEATURES"
              :key="feature.title"
              :title="feature.title"
              :content="feature.content"
              :index="i + 1"
              @mouseenter="setActive(i)"
              @mouseleave="clearActive"
            />
          </div>
          <div>
            <NuxtImg fit="cover" src="/demo.gif" alt="hero" />
          </div>
        </div>
      </UContainer>

      <UContainer
        class="flex w-full flex-col items-center justify-center gap-12 py-20 lg:gap-20 lg:py-32"
      >
        <span class="text-center text-3xl font-bold lg:text-5xl">
          {{ t("landing.questions_frequent") }}
        </span>
        <UAccordion
          size="xl"
          multiple
          :items="QUESTIONS"
          :ui="{ default: { truncate: false, class: 'text-left mb-1.5' } }"
        />
      </UContainer>

      <UContainer
        id="contact"
        class="flex w-full flex-col items-center justify-center gap-12 py-20 lg:gap-16 lg:py-32"
      >
        <span class="text-center text-3xl font-bold lg:text-5xl">
          {{ t("landing.contact.title") }}
        </span>
        <UtilsHelp />
      </UContainer>
    </UContainer>
    <LandingFooter />
  </div>
</template>
