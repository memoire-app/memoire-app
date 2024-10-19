<script setup lang="ts">
import dayjs from "dayjs";
import type { DashboardStats } from "~/models";
import { VisXYContainer, VisAxis, VisArea } from "@unovis/vue";

const props = defineProps<{
  data: DashboardStats;
}>();

// Group the nb of revisions by days for last 30 days
const groupRevisionsByDays = (revisions: DashboardStats["revisions"]) => {
  const revisionsByDays: { [key: string]: number } = {};
  revisions.forEach((revision) => {
    const day = dayjs(revision.updatedAt).format("DD/MM/YYYY");
    if (!revisionsByDays[day]) {
      revisionsByDays[day] = 0;
    }
    revisionsByDays[day] += 1;
  });
  return revisionsByDays;
};

// Generate the data for the chart
const last30Days = Array.from({ length: 30 }, (_, i) =>
  dayjs().subtract(i, "day").format("DD/MM/YYYY"),
);

const groupedData = groupRevisionsByDays(props.data.revisions);

// Create an array of objects with day and value properties
const seriesData = last30Days.map((day) => ({
  day,
  value: groupedData[day] || 0,
}));

interface SeriesData {
  day: string;
  value: number;
}

// X and Y accessor functions
const x = (d: SeriesData, i: number) => i;
const y = (d: SeriesData) => d.value;

const tickFormat = (tick: number) => seriesData[tick].day;
</script>

<template>
  <div class="w-full">
    <VisXYContainer :data="seriesData">
      <VisAxis type="x" :tick-format="tickFormat" />
      <VisAxis type="y" />
      <VisArea :x="x" :y="y" :minHeight1Px="true" />
    </VisXYContainer>
  </div>
</template>
