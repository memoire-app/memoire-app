<template>
  <div class="h-48 w-full border-t bg-white dark:bg-neutral-900">
    <UContainer class="pt-6">
      <div class="flex justify-around">
        <div class="flex flex-col gap-4">
          <span class="text-lg font-semibold">Liens utiles</span>
          <div class="flex flex-col gap-2 text-sm">
            <NuxtLink to="https://github.com/memoire-app" target="_blank"
              >GitHub</NuxtLink
            >
            <NuxtLink to="https://discord.gg/CcqzXXJfvm" target="_blank"
              >Discord</NuxtLink
            >
          </div>
        </div>

        <div class="flex max-w-40 flex-col gap-4">
          <span class="text-lg font-semibold">Copyright</span>
          <div class="flex flex-col gap-2 text-sm">
            Développé avec 💙 par
            <NuxtLink to="https://github.com/remisaurel" target="_blank"
              >Rémi Saurel</NuxtLink
            >
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
