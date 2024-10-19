<script setup lang="ts">
import { useI18n } from "vue-i18n";

definePageMeta({
  layout: "no-auth",
});

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
    <div
      :style="{ backgroundImage: `url(${bg})` }"
      class="fixed -z-50 h-full w-full bg-cover bg-center opacity-50"
    />
    <Navbar />
    <UContainer>
      <UContainer
        class="flex w-full flex-col items-center justify-center gap-4 pt-24 text-center md:pt-48"
      >
        <div
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 1500, delay: 1000 },
          }"
        >
          <div
            class="rounded-3xl border border-slate-200 px-3 py-1 text-sm text-slate-700 transition-all dark:text-slate-300"
            to="/login"
          >
            ✨ {{ t("landing.welcome") }}
          </div>
        </div>
        <h1
          v-motion
          :initial="{ opacity: 0, x: -200 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { duration: 1500 },
          }"
          class="text-4xl font-bold lg:text-6xl"
        >
          {{ t("landing.study") }}
        </h1>
        <h3
          v-motion
          :initial="{ opacity: 0, x: -200 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { duration: 1500 },
          }"
          class="max-w-[500px] pt-2 text-slate-500"
        >
          {{ t("landing.subtitle") }}
        </h3>
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 1500, delay: 1500 },
          }"
        >
          <UButton
            class="mt-8"
            to="/login"
            size="xl"
            icon="i-lucide-badge-plus"
          >
            {{ t("landing.create") }}
          </UButton>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 1500, delay: 2000 },
          }"
          class="mt-24 hidden md:block"
        >
          <div
            class="flex h-10 w-6 justify-center rounded-xl border-2 border-slate-400 pt-1"
          >
            <div
              v-motion
              :initial="{ opacity: 0, y: 0, transition: { repeat: Infinity } }"
              :enter="{ opacity: 1, y: 20, transition: { repeat: Infinity } }"
              :duration="1400"
              :delay="200"
            >
              <div class="size-1 rounded-full bg-slate-400" />
            </div>
          </div>
        </div>
      </UContainer>

      <div
        v-motion
        :initial="{ opacity: 0, y: 200 }"
        :visibleOnce="{ opacity: 1, y: 0, scale: 1 }"
        :duration="1500"
      >
        <div class="mt-36 hidden skew-x-12 justify-center md:flex">
          <NuxtImg src="/FLASHCARDS.png" alt="hero" class="w-4/5" />
        </div>
      </div>

      <UContainer
        id="features"
        class="flex w-full flex-col items-center justify-center gap-12 py-16 lg:gap-20 lg:py-24"
      >
        <span
          class="inline-flex flex-wrap items-baseline justify-center gap-3 text-center text-3xl font-bold lg:text-5xl"
          :style="{ lineHeight: '1.5' }"
        >
          {{ t("landing.why") }}
          <NuxtImg
            :src="
              colorMode.value === 'dark' ? '/lightmemoire.svg' : '/memoire.svg'
            "
            alt="logo"
            class="inline-flex w-32 items-center lg:w-44"
          />
          ?
        </span>

        <div class="flex w-full flex-col gap-8 lg:w-1/2">
          <div
            v-for="(feature, i) in FEATURES"
            :key="feature.title"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: { duration: 1500, easing: 'ease-out' },
            }"
          >
            <LandingAutoplayBox
              :title="feature.title"
              :content="feature.content"
              :index="i + 1"
            />
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
