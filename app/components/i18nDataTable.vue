<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'
import { useI18nAPI } from '~/composables/useI18nAPI'

const props = defineProps<{
  items: I18nListEntry[]
  locales: string[]
  loading?: boolean
}>()

const searchValue = useSearchValue()

const { updateI18nEntry } = useI18nAPI()
const { getLocaleTitleByKey } = useLocale()

async function updateEntry(entry: I18nListEntry, isActive: Ref<boolean>) {
  try {
    await updateI18nEntry(entry)
    isActive.value = false
  }
  catch (error) {
    console.error('error updating entry:', error)
  }
}

const headers = computed<DataTableHeader[]>(() => {
  const i: DataTableHeader[] = [
    { key: 'key', title: 'i18n key' },
    // { key: 'title', title: 'Title', maxWidth: 150 },
  ]
  props.locales.forEach((locale) => {
    i.push({ key: `value.${locale}`, title: getLocaleTitleByKey(locale) })
  })
  i.push({ key: 'actions', title: '', minWidth: 116 - 40 })
  return i
})

function isLocaleMissing(item: I18nListEntry) {
  const values = item.value
  if (values) {
    return props.locales.some(locale => !values[locale])
  }
  return false
}
</script>

<template>
  <v-data-table
    :items="items"
    :headers="headers"
    :loading="loading"
    fixed-header
    :items-per-page="-1"
    hide-default-footer
    color="primary"
    :search="searchValue"
    height="calc(100vh - var(--v-layout-top) - var(--v-layout-bottom))"
  >
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon v-if="isLocaleMissing(item)" icon="mdi-alert" color="error" class="mr-1" />
        <v-icon v-if="!isLocaleMissing(item)" :icon="item.isFolder ? 'mdi-folder' : 'mdi-earth'" color="primary" class="mr-1" />
        <div>
          {{ item.key }}
        </div>
        <v-btn v-if="!item.isFolder" icon="mdi-content-copy" size="small" variant="text" @click.stop="copyTextToClipboard(item.key)" />
      </div>
    </template>

    <template #[`item.actions`]="{ item }">
      <div>
        <v-dialog width="400" persistent>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-pencil-outline" size="small" variant="text" color="primary" class="pr-1" @click.stop />
          </template>

          <template #default="{ isActive }">
            <i18nEntryEdit :entry="item" :locales="locales" @cancel="isActive.value = false" @save="(e) => updateEntry(e, isActive)" />
          </template>
        </v-dialog>
        <!-- <v-btn icon="mdi-trash-can-outline" size="small" variant="text" color="error" class="pl-1" @click.stop /> -->
      </div>
    </template>
  </v-data-table>
</template>
