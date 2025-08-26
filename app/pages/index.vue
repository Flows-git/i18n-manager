<!-- <script setup lang="ts">
const { data, pending } = useFetch<{ data: Array<TreeViewEntry>, locales: string[] }>('/api/i18n', { lazy: true, server: false })
const locales = computed(() => data.value?.locales || [])
const items = computed(() => data.value?.data || [])
</script>

<template>
  <v-container fluid>
    <v-text-field label="Übersetzung suchen" hide-details color="primary" />
    <v-checkbox label="Nur Fehlende Übersetzungen anzeigen" hide-details density="compact" color="primary" />
    <I18nTreeView :items="items" :locales="locales" :loading="pending" />
  </v-container>
</template> -->

<template>
  <I18nDataTable style="max-height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));" />
</template>
