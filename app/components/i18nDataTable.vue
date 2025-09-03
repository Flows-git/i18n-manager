<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

const props = defineProps<{
  items: I18nItem[]
  locales: string[]
  loading?: boolean
}>()

const { updateI18nEntry, deleteI18nEntry } = useI18nAPI()
const { searchValue } = useI18nData()
const { getLocaleTitleByKey } = useLocale()

async function updateEntry(entry: I18nEntry, isActive: Ref<boolean>) {
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
    { key: 'key', title: 'i18n key', minWidth: 300, width: 450 },
    // { key: 'title', title: 'Title', maxWidth: 150 },
  ]
  props.locales.forEach((locale) => {
    i.push({ key: `value.${locale}`, title: getLocaleTitleByKey(locale), minWidth: 180, sortable: false })
  })
  i.push({ key: 'actions', title: '', width: 116 - 40, minWidth: 116 - 40, sortable: false })
  return i
})

function isLocaleMissing(item: I18nEntry) {
  const values = item.value
  if (values) {
    return props.locales.some(locale => !values[locale])
  }
  return false
}

async function deleteEntry(item: I18nEntry, isActive: Ref<boolean>) {
  await deleteI18nEntry(item)
  isActive.value = false
}

function isFolder(item: I18nItem) {
  return item.type === 'folder'
}
</script>

<template>
  <v-data-table-virtual
    :items="items" :headers="headers" :loading="loading" fixed-header :items-per-page="-1" hide-default-footer :search="searchValue"
    height="calc(100vh - var(--v-layout-top) - var(--v-layout-bottom))"
  >
    <template #[`item.key`]="{ item }">
      <div class="d-flex align-center">
        <v-icon v-if="!isFolder(item) && isLocaleMissing(item)" icon="mdi-alert" color="error" class="mr-1" />
        <v-icon v-else :icon="isFolder(item) ? 'mdi-folder' : 'mdi-earth'" color="primary" class="mr-1" />
        <div class="i18n-key">
          {{ item.key.replace(/\./g, ".\u200B") }}
          <v-btn
            v-if="!isFolder(item)" v-tooltip:end="{ text: 'copy key', contentClass: 'tooltip-success' }" icon="mdi-content-copy" size="small" variant="text"
            @click.stop="copyTextToClipboard(item.key)"
          />
        </div>
      </div>
    </template>

    <template #[`item.actions`]="{ item }">
      <div>
        <v-dialog v-if="!isFolder(item)" width="400" persistent>
          <template #activator="{ props: dialogProps }">
            <v-btn v-bind="dialogProps" icon="mdi-pencil-outline" size="small" variant="text" color="primary" class="pr-1" @click.stop />
          </template>

          <template #default="{ isActive }">
            <i18nEntryEdit :entry="item" :locales="locales" @cancel="isActive.value = false" @save="(e) => updateEntry(e, isActive)" @delete="deleteEntry(item, isActive)" />
          </template>
        </v-dialog>
      </div>
    </template>
  </v-data-table-virtual>
</template>

<style lang="scss">
.tooltip-success {
  background: rgb(var(--v-theme-primary)) !important
}

.i18n-key {
  &::after {
    content: "\200B";
  }
}
</style>
