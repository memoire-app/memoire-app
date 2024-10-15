<script setup lang="ts">
import { Donut } from "@unovis/ts";
import { VisSingleContainer, VisTooltip, VisDonut } from "@unovis/vue";
import type { DashboardStats } from "~/models";

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
const series = Object.values(groupedData).map((value, index) => ({
  name: subjects[index],
  value,
}));

const value = (d: { name: string; value: number }) => d.value;
const name = (d: { data: { name: string } }) => d.data.name;

const triggers = {
  [Donut.selectors.segment]: (d: { data: { name: string; value: number } }) => {
    return `<span>${name(d)}: ${d.data.value}</span>`;
  },
};
</script>

<template>
  <div class="w-24">
    <VisSingleContainer :data="series">
      <VisDonut :arc-width="50" :value="value" />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
  </div>
</template>
