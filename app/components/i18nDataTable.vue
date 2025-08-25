<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

const { data, pending } = useFetch<{ data: Array<I18nListEntry>, locales: string[] }>('/api/i18nList', { lazy: true, server: false })

const headers = computed<DataTableHeader[]>(() => {
  const items: DataTableHeader[] = [
    { key: 'key', title: 'Key' },
    // { key: 'title', title: 'Title', maxWidth: 150 },
  ]
  data.value?.locales.forEach((locale) => {
    items.push({ key: `value.${locale}`, title: locale.toUpperCase() })
  })
  items.push({ key: 'actions', title: '', minWidth: 116 })
  return items
})
</script>

<template>
  <v-data-table :items="data?.data" :headers="headers" :loading="pending" fixed-header :items-per-page="-1">
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon :icon="item.isFolder ? 'mdi-folder' : 'mdi-earth'" class="mr-1" />
        <div>
          {{ item.key }}
        </div>
        <v-btn v-if="!item.isFolder" icon="mdi-content-copy" size="small" @click.stop="copyTextToClipboard(item.key)" />
      </div>
    </template>

    <template #[`item.actions`]>
      <div>
        <v-btn icon="mdi-square-edit-outline" size="small" @click.stop />
        <v-btn icon="mdi-trash-can-outline" size="small" class="pl-1" @click.stop />
      </div>
    </template>
  </v-data-table>
</template>
