<script setup lang="ts">
const selected = ref()

const { data } = useFetch<{ data: Array<TreeViewEntry>, locales: string[] }>('/api/i18n', { lazy: true, server: false })
// const data = ref<{ data: Array<TreeViewEntry>, locales: string[] }>()
const locales = computed(() => data.value?.locales || [])
const items = computed(() => data.value?.data || [])

function getIcon(item: TreeViewEntry, isOpen: boolean) {
  if (item.children)
    return isOpen ? 'mdi-folder-open' : 'mdi-folder'
  if (isLocaleMissing(item))
    return 'mdi-alert'
  return 'mdi-earth'
}

function isLocaleMissing(item: TreeViewEntry) {
  const values = item.value
  if (values) {
    return locales.value.some(locale => !values[locale])
  }
  return false
}
</script>

<template>
  <v-container fluid>
    <v-text-field label="Übersetzung suchen" hide-details color="primary" />
    <v-checkbox label="Nur Fehlende Übersetzungen anzeigen" hide-details density="compact" color="primary" />
    <v-treeview
      v-model="selected" :hide-actions="false" :indent-lines="true" :items="items" :separate-roots="true" density="compact" item-value="id" open-all
      open-on-click return-object
    >
      <template #prepend="{ item, isOpen }">
        <v-icon :icon="getIcon(item, isOpen)" :color="isLocaleMissing(item) ? 'error' : undefined" />
      </template>

      <template #title="{ item }">
        <div>
          {{ item.title }}
          <template v-if="item.value">
            <template v-for="locale of locales" :key="locale">
              <v-chip density="compact" :color="item.value[locale] ? 'success' : 'error'" class="mx-1">
                {{ locale }}
              </v-chip>
            </template>
          </template>
          <!-- {{ item.value }} -->
        </div>
      </template>

      <template #append="{ item }">
        <template v-if="item.key">
          <span>{{ item.key }}</span>
          <v-btn icon="mdi-content-copy" size="small" class="ml-2" @click.stop />
        </template>
      </template>
    </v-treeview>
    <v-navigation-drawer :model-value="!!selected?.[0]" location="end" width="400">
      <div v-if="!!selected?.[0]" class="pa-3">
        <div class="text-center">
          <v-icon :icon="getIcon(selected[0], false)" size="80" />
        </div>
        <div class="text-h6 pb-3 text-center" style="line-break: anywhere;">
          {{ selected[0].key }}
          <div>
            <v-btn icon="mdi-content-copy" size="small" class="ml-2" @click.stop />
            <v-btn icon="mdi-trash-can-outline" size="small" class="ml-2" @click.stop />
          </div>
        </div>
        <v-divider />
        <template v-for="locale of locales" :key="locale">
          <div class="py-2 d-flex">
            <v-chip density="compact" :color="selected[0].value[locale] ? 'default' : 'error'" class="mx-1">
              {{ locale }}
            </v-chip>
            <div>
              {{ selected[0].value[locale] }}
            </div>
          </div>
          <v-divider />
        </template>
      </div>
    </v-navigation-drawer>
  </v-container>
</template>
