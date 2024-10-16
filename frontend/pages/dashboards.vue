<script setup lang="ts">
import type { DashboardStats } from "~/models";
definePageMeta({
  layout: "app",
  middleware: "auth",
});

const { t } = useI18n();

const headers = useRequestHeaders();
const runtimeConfig = useRuntimeConfig();

const { data: stats } = useFetch<DashboardStats>(`/stats`, {
  baseURL: runtimeConfig.public.BACK_URL as string,
  headers,
  credentials: "include",
  lazy: true,
});

const links = [
  {
    label: t("pages.dashboards.title"),
    icon: "i-lucide-scatter-chart",
    to: "/dashboards",
  },
];
</script>

<template>
  <!-- DASHBOARDS tab -->
  <div>
    <UBreadcrumb :links="links" />

    <div
      v-if="stats"
      class="mt-8 flex w-full flex-wrap gap-2 overflow-auto px-0.5 py-2"
    >
      <div class="flex flex-1 flex-col gap-4">
        <DashboardGlobalStats :data="stats" />
        <div class="flex flex-col gap-4 md:flex-row xl:w-4/5">
          <DashboardChartContainer
            :title="t('dashboards.monthlyRevisions.title')"
          >
            <DashboardBarChart :data="stats" />
          </DashboardChartContainer>
          <DashboardChartContainer
            :title="t('dashboards.revisionsByDeck.title')"
          >
            <DashboardPieChart :data="stats" />
          </DashboardChartContainer>
        </div>
      </div>
    </div>
  </div>
</template>
