<script setup lang="ts">
const { t } = useI18n();
const inputValue = ref("");

const tags = defineModel({
  type: Array,
  default: () => [],
});

const addTag = () => {
  const tag = inputValue.value.trim();
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag);
    inputValue.value = "";
  }
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTag();
  }
};

// If backspace is pressed and the input is empty, remove the last tag
const handleBackspace = (event: KeyboardEvent) => {
  if (event.key === "Backspace" && !inputValue.value) {
    removeTag(tags.value.length - 1);
  }
};

// Add a listener for the backspace key
onMounted(() => {
  window.addEventListener("keydown", handleBackspace);
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="flex flex-wrap rounded-md border border-slate-300 p-1 dark:border-slate-700"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="flex items-center rounded bg-slate-200 px-2 py-0.5 text-sm dark:text-black"
        >
          {{ tag }}
          <button
            class="ml-2 cursor-pointer text-base"
            @click="removeTag(index)"
          >
            ✕
          </button>
        </span>
      </div>
      <UInput
        v-model="inputValue"
        variant="none"
        :placeholder="t('decks.tagsPlaceholder')"
        class="flex-1 border-none text-sm outline-none"
        @keydown="handleKeyPress"
      />
    </div>
    <span class="text-xs">
      {{ t("decks.tagsCreation1") }} <UKbd value="↵" />
      {{ t("decks.tagsCreation2") }}
    </span>
  </div>
</template>
