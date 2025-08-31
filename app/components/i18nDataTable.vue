<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'
import { useI18nAPI } from '~/composables/useI18nAPI'

const props = defineProps<{
  items: I18nListEntry[]
  locales: string[]
  loading?: boolean
}>()

const { showWarningDialog } = useConfirmDialog()
const { updateI18nEntry, deleteI18nEntry } = useI18nAPI()
const { getLocaleTitleByKey } = useLocale()

const searchValue = useSearchValue()

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
    { key: 'key', title: 'i18n key', maxWidth: 200 },
    // { key: 'title', title: 'Title', maxWidth: 150 },
  ]
  props.locales.forEach((locale) => {
    i.push({ key: `value.${locale}`, title: getLocaleTitleByKey(locale), minWidth: 180 })
  })
  i.push({ key: 'actions', title: '', minWidth: 116 })
  return i
})

function isLocaleMissing(item: I18nListEntry) {
  const values = item.value
  if (values) {
    return props.locales.some(locale => !values[locale])
  }
  return false
}

async function deleteEntry(item: I18nListEntry) {
  if (await showWarningDialog(`Do you really want to delete the translation key "${item.key}"`)) {
    deleteI18nEntry(item)
  }
}
</script>

<template>
  <v-data-table
    :items="items" :headers="headers" :loading="loading" fixed-header :items-per-page="-1" hide-default-footer :search="searchValue"
    height="calc(100vh - var(--v-layout-top) - var(--v-layout-bottom))"
  >
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon v-if="!item.isFolder && isLocaleMissing(item)" icon="mdi-alert" color="error" class="mr-1" />
        <v-icon v-else :icon="item.isFolder ? 'mdi-folder' : 'mdi-earth'" color="primary" class="mr-1" />
        <div>
          {{ item.key }}
        </div>
        <v-btn
          v-if="!item.isFolder" v-tooltip:end="{ text: 'copy key', contentClass: 'tooltip-success' }" icon="mdi-content-copy" size="small" variant="text"
          @click.stop="copyTextToClipboard(item.key)"
        />
      </div>
    </template>

    <template #[`item.actions`]="{ item }">
      <div>
        <v-dialog v-if="!item.isFolder" width="400" persistent>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-pencil-outline" size="small" variant="text" color="primary" class="pr-1" @click.stop />
          </template>

          <template #default="{ isActive }">
            <i18nEntryEdit :entry="item" :locales="locales" @cancel="isActive.value = false" @save="(e) => updateEntry(e, isActive)" />
          </template>
        </v-dialog>
        <v-btn icon="mdi-trash-can-outline" size="small" variant="text" color="error" class="pl-1" @click.stop="deleteEntry(item)" />
      </div>
    </template>
  </v-data-table>
</template>

<style lang="scss">
.tooltip-success {
  background: rgb(var(--v-theme-primary)) !important
}
</style>
