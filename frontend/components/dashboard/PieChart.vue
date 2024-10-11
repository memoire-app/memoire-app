<script setup lang="ts">
import { ref, watch } from "vue";
import type { DashboardStats } from "~/models";
const { t } = useI18n();
const props = defineProps<{
  data: DashboardStats;
}>();

// Group revisions by subject (deckId)
const groupRevisionsBySubject = (revisions: DashboardStats["revisions"]) => {
  const revisionsBySubject: { [key: string]: number } = {};

  revisions.forEach((revision) => {
    const subjectKey = `${revision.deckId}-${revision.deckTitle}`;

    if (!revisionsBySubject[subjectKey]) {
      revisionsBySubject[subjectKey] = 0;
    }

    revisionsBySubject[subjectKey] += 1;
  });

  return revisionsBySubject;
};

// Generate the data for the chart
const groupedData = groupRevisionsBySubject(props.data.revisions);
const subjects = Object.keys(groupedData);
const series = Object.values(groupedData);

const colorMode = useColorMode();

const options = ref({
  title: {
    offsetY: 10,
    text: t("dashboards.revisionsBySubject.title"),
    align: "center",
  },
  chart: {
    id: "subject-revisions-pie",
  },
  labels: subjects,
  theme: {
    mode: colorMode.value,
  },
  legend: {
    position: "bottom",
  },
});

watch(colorMode, () => {
  options.value = {
    ...options.value,
    theme: {
      mode: colorMode.value,
    },
  };
});
</script>

<template>
  <ClientOnly>
    <apexchart
      class="flex-1"
      height="332"
      type="pie"
      :options="options"
      :series="series"
    />
  </ClientOnly>
</template>
