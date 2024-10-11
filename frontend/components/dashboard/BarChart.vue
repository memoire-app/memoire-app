<script setup lang="ts">
import { ref, watch } from "vue";
import dayjs from "dayjs";
import type { DashboardStats } from "~/models";
const { t } = useI18n();
const props = defineProps<{
  data: DashboardStats;
}>();

// Function to generate all months of the year
const generateMonthsOfYear = (year: number) => {
  const months: string[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(dayjs(`${year}-${i}-01`).format("MM/YYYY"));
  }
  return months;
};

// Group revisions by month
const groupRevisionsByMonth = (revisions: DashboardStats["revisions"]) => {
  const revisionsByMonth: { [key: string]: number } = {};

  revisions.forEach((revision) => {
    const month = dayjs(revision.updatedAt).format("MM/YYYY");
    if (!revisionsByMonth[month]) {
      revisionsByMonth[month] = 0;
    }
    revisionsByMonth[month] += 1;
  });

  return revisionsByMonth;
};

// Generate the data for the chart
const currentYear = dayjs().year();
const allMonths = generateMonthsOfYear(currentYear);
const groupedData = groupRevisionsByMonth(props.data.revisions);

// Ensure every month has a corresponding value, even if it's zero
const seriesData = allMonths.map((month) => groupedData[month] || 0);

const colorMode = useColorMode();

const options = ref({
  title: {
    text: t("dashboards.monthlyRevisions.title"),
    align: "center",
    offsetY: 10,
  },
  chart: {
    id: "monthly-revisions-bar",
  },
  xaxis: {
    categories: allMonths,
  },
  theme: {
    mode: colorMode.value,
    monochrome: {
      enabled: true,
      color: "#255aee",
    },
  },
});

watch(colorMode, () => {
  options.value = {
    ...options.value,
    theme: {
      mode: colorMode.value,
      monochrome: {
        enabled: true,
        color: "#255aee",
      },
    },
  };
});

const series = [
  {
    name: "Revisions",
    data: seriesData,
  },
];
</script>

<template>
  <ClientOnly>
    <apexchart
      class="flex-1"
      height="300"
      type="bar"
      :options="options"
      :series="series"
    />
  </ClientOnly>
</template>
