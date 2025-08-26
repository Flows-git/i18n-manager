<script setup lang="ts">
const props = defineProps<{
  items: TreeViewEntry[]
  locales: string[]
  loading?: boolean
  search?: string
}>()

const selected = shallowRef()

// const data = ref<{ data: Array<TreeViewEntry>, locales: string[] }>()
const locales = computed(() => props.locales || [])
const items = computed(() => props.items || [])

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
  <v-treeview
    v-model="selected" :hide-actions="false" :indent-lines="true" :items="items" :separate-roots="true" density="compact" item-value="key" item-title="key"
    :loading="loading" open-on-click return-object open-all :search="search"
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
        <v-btn icon="mdi-content-copy" size="small" class="ml-2" @click.stop="copyTextToClipboard(item.key)" />
      </template>
    </template>
  </v-treeview>
  <v-navigation-drawer :model-value="!!selected?.[0]" location="end" width="400" permanent>
    <div v-if="!!selected?.[0]" :key="selected[0].key" class="pa-3">
      <v-btn icon="mdi-close" variant="text" style="position: absolute; right: 8px" @click="selected = []" />

      <div>
        <v-btn icon="mdi-content-copy" size="small" class="ml-2" @click.stop="copyTextToClipboard(selected[0].key)" />
        <v-btn icon="mdi-trash-can-outline" size="small" class="ml-2" @click.stop />
      </div>
      <i18nEntryEdit :entry="selected[0]" :locales="locales" elevation="0" />
    </div>
  </v-navigation-drawer>
</template>
