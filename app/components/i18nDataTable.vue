<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

const { data, pending, refresh } = useFetch<{ data: Array<I18nListEntry>, locales: string[] }>('/api/i18nList')

const locales = computed(() => data.value?.locales || [])
const items = computed(() => data.value?.data || [])
const searchValue = useState<string>('i18n-search-value')

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
  const i: DataTableHeader[] = [
    { key: 'key', title: 'Key' },
    // { key: 'title', title: 'Title', maxWidth: 150 },
  ]
  locales.value.forEach((locale) => {
    i.push({ key: `value.${locale}`, title: locale.toUpperCase() })
  })
  i.push({ key: 'actions', title: '', minWidth: 116 })
  return i
})

function isLocaleMissing(item: I18nListEntry) {
  const values = item.value
  if (values) {
    return locales.value.some(locale => !values[locale])
  }
  return false
}
</script>

<template>
  <v-data-table :items="items" :headers="headers" :loading="pending" fixed-header :items-per-page="-1" hide-default-footer color="primary" :search="searchValue">
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon v-if="isLocaleMissing(item)" icon="mdi-alert" color="error" class="mr-1" />
        <v-icon v-if="!isLocaleMissing(item)" :icon="item.isFolder ? 'mdi-folder' : 'mdi-earth'" color="primary" class="mr-1" />
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
            <i18nEntryEdit :entry="item" :locales="locales" @cancel="isActive.value = false" @save="(e) => updateEntry(e, isActive)" />
          </template>
        </v-dialog>
        <v-btn icon="mdi-trash-can-outline" size="small" class="pl-1" @click.stop />
      </div>
    </template>
  </v-data-table>
</template>
