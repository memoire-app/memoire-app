<script setup lang="ts">
const props = defineProps({
  authorName: {
    type: String,
    required: true,
  },
  original: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div>
    <UTooltip
      :text="props.original ? 'Créateur original' : 'Créateur d\'une copie'"
    >
      <div class="flex items-center gap-1">
        <UIcon
          name="i-lucide-circle-user-round"
          :class="[
            props.original
              ? 'text-black dark:text-neutral-300'
              : 'text-red-500',
          ]"
          size="16"
        />
        <span class="text-sm">{{ props.authorName }}</span>
      </div>
    </UTooltip>
  </div>
</template>
