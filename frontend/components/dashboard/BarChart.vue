<script setup lang="ts">
import dayjs from "dayjs";
import type { DashboardStats } from "~/models";
import {
  VisXYContainer,
  VisAxis,
  VisTooltip,
  VisStackedBar,
} from "@unovis/vue";
import { StackedBar } from "@unovis/ts";

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

// Create an array of objects with month and value properties
const seriesData = allMonths.map((month) => ({
  month,
  value: groupedData[month] || 0,
}));

interface SeriesData {
  month: string;
  value: number;
}
// X and Y accessor functions
const x = (d: SeriesData, i: number) => i;
const y = (d: SeriesData) => d.value;

const tickFormat = (tick: number) => seriesData[tick].month;

const tooltipConfig = {
  [StackedBar.selectors.bar]: (d: SeriesData) => {
    return `<span>${d.month}: ${d.value}</span>`;
  },
};
</script>

<template>
  <div class="w-full">
    <VisXYContainer :data="seriesData">
      <VisAxis type="x" :tick-format="tickFormat" />
      <VisAxis type="y" />
      <VisStackedBar :x="x" :y="y" />
      <VisTooltip :triggers="tooltipConfig" />
    </VisXYContainer>
  </div>
</template>
