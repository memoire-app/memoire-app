<script lang="tsx" setup>
export interface ColorOptions {
  borderColor: string;
  backgroundColor: string;
  darkBorderColor: string;
  darkBackgroundColor: string;
}
defineProps<{
  colorOptions?: ColorOptions;
}>();
</script>

<template>
  <span
    class="rounded-lg border px-2 py-0.5"
    :class="[
      colorOptions
        ? [
            colorOptions.borderColor,
            colorOptions.backgroundColor,
            colorOptions.darkBorderColor,
            colorOptions.darkBackgroundColor,
          ]
        : [
            'border-blue-300',
            'bg-blue-50',
            'dark:border-blue-950',
            'dark:bg-blue-900',
          ],
    ]"
  >
    <slot />
  </span>
</template>
