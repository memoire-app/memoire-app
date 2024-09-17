<script setup lang="ts">
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
</script>

<template>
  <div class="flex flex-wrap rounded-md border border-gray-300 p-1">
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center rounded bg-gray-200 px-2 py-0.5 text-sm dark:text-black"
      >
        {{ tag }}
        <button class="ml-2 cursor-pointer text-base" @click="removeTag(index)">
          ✕
        </button>
      </span>
    </div>
    <UInput
      v-model="inputValue"
      variant="none"
      placeholder="SVT, Maths, ..."
      class="flex-1 border-none text-sm outline-none"
      @keydown="handleKeyPress"
    />
  </div>
</template>
