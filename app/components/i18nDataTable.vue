<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

const { data, pending, refresh } = useFetch<{ data: Array<I18nListEntry>, locales: string[] }>('/api/i18nList')

async function updateEntry(entry: I18nListEntry, isActive: Ref<boolean>) {
  try {
    await $fetch('/api/i18n', {
      method: 'POST',
      body: entry,
    })
    await refresh()
    isActive.value = false
  }
  catch (error) {
    console.error('error updating entry:', error)
  }
}

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
  <v-data-table :items="data?.data" :headers="headers" :loading="pending" fixed-header :items-per-page="-1" hide-default-footer>
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon :icon="item.isFolder ? 'mdi-folder' : 'mdi-earth'" class="mr-1" />
        <div>
          {{ item.key }}
        </div>
        <v-btn v-if="!item.isFolder" icon="mdi-content-copy" size="small" @click.stop="copyTextToClipboard(item.key)" />
      </div>
    </template>

    <template #[`item.actions`]="{ item }">
      <div>
        <v-dialog width="400" persistent>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-pencil-outline" size="small" class="pr-1" @click.stop />
          </template>

          <template #default="{ isActive }">
            <i18nEntryEdit :entry="item" :locales="data?.locales ?? []" @cancel="isActive.value = false" @save="(e) => updateEntry(e, isActive)" />
          </template>
        </v-dialog>
        <v-btn icon="mdi-trash-can-outline" size="small" class="pl-1" @click.stop />
      </div>
    </template>
  </v-data-table>
</template>
