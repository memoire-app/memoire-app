<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      {{ t("landing.contact.github") }}
      <UtilsHighlightedWord>
        <NuxtLink to="https://github.com/memoire-app" target="_blank">
          GitHub
        </NuxtLink>
      </UtilsHighlightedWord>
    </div>
    <div>
      {{ t("landing.contact.discord") }}
      <UtilsHighlightedWord>
        <NuxtLink to="https://discord.gg/CcqzXXJfvm" target="_blank">
          Discord
        </NuxtLink>
      </UtilsHighlightedWord>
      {{ t("landing.contact.discord_community") }}
    </div>
  </div>
</template>
