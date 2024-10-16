<template>
  <UCard
    class="min-w-60 border-t border-slate-100 shadow dark:border-slate-600 dark:bg-slate-800"
  >
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
      <div v-if="$slots.description" class="text-xs text-slate-500">
        <slot name="description" />
      </div>
    </div>
  </UCard>
</template>
