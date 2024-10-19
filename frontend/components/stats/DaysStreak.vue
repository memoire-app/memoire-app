<script setup lang="ts">
const props = defineProps({
  revisionDays: {
    type: Array as PropType<Date[]>,
    required: true,
  },
});

const { t } = useI18n();

const formatDate = (date: Date) => {
  return date
    .toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
    })
    .split("/")
    .reverse()
    .join("/");
};

const lastSevenDays = computed(() => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    return formatDate(day);
  }).reverse();
});

const formattedRevisionDays = computed(() => {
  return props.revisionDays.map((date) => formatDate(new Date(date)));
});
</script>

<template>
  <div
    class="flex h-fit flex-1 flex-col rounded border border-slate-200 p-4 dark:border-slate-700"
  >
    <div
      class="mb-2 inline-flex gap-2 font-medium text-slate-600 dark:text-slate-400"
    >
      <UIcon name="i-lucide-calendar" size="24" />
      {{ t("decks.stats.daysStreak") }}
    </div>
    <div class=":gap-6 m-auto flex h-fit flex-1 justify-between gap-3">
      <div
        v-for="day in lastSevenDays"
        :key="day"
        class="flex flex-col items-center justify-between gap-1"
      >
        <UIcon
          v-if="formattedRevisionDays.includes(day)"
          name="i-lucide-circle-check-big"
          size="24"
          class="text-blue-500"
        />
        <div v-else class="text-slate-300 dark:text-slate-600">•</div>
        <div class="text-sm text-gray-500">{{ day }}</div>
      </div>
    </div>
  </div>
</template>
