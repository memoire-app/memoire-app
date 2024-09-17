<template>
  <UCard class="min-w-60">
    <div class="relative flex h-fit flex-col gap-1">
      <div class="absolute right-2 top-0">
        <slot name="icon" />
      </div>
      <div class="text-sm font-semibold">
        <slot name="title" />
      </div>
      <div class="pt-1 text-3xl font-bold">
        <slot name="data" />
      </div>
      <div v-if="$slots.description" class="text-xs text-neutral-500">
        <slot name="description" />
      </div>
    </div>
  </UCard>
</template>
