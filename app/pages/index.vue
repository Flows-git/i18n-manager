<!-- <script setup lang="ts">
const { data, pending } = useFetch<{ data: Array<TreeViewEntry>, locales: string[] }>('/api/i18n', { lazy: true, server: false })
const locales = computed(() => data.value?.locales || [])
const items = computed(() => data.value?.data || [])
const searchValue = useState<string>('i18n-search-value')
</script>

<template>
  <v-container fluid>
    <v-text-field label="Übersetzung suchen" hide-details color="primary" />
    <v-checkbox label="Nur Fehlende Übersetzungen anzeigen" hide-details density="compact" color="primary" />
    <I18nTreeView :items="items" :locales="locales" :loading="pending" :search="searchValue" />
  </v-container>
</template> -->

<script setup lang="ts">
const { items, locales, loading, fetchI18nData } = useI18nAPI()
fetchI18nData()
</script>

<template>
  <I18nDataTable :items="items" :locales="locales" :loading="loading" class="i18n-full-height" />
</template>

<style scoped>
.i18n-full-height {
  max-height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
}
</style>
