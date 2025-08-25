<script setup lang="ts">
import de from '@@/data/de.json'
import en from '@@/data/en.json'
import fr from '@@/data/fr.json'
import merge from 'deepmerge'

interface I18nObject {
  [key: string]: string | I18nObject
}
interface TreeViewEntry {
  title: string
  value?: Record<string, string>
  key?: string
  children?: TreeViewEntry[]
}

const selected = ref()

const items = ref<TreeViewEntry[]>([])
const locales = ref<string[]>([])

addI18nLocale(de, 'de')
addI18nLocale(en, 'en')
addI18nLocale(fr, 'fr')

function addI18nLocale(data: I18nObject, locale: string) {
  const treeviewData = parseI18n(data, locale)
  items.value = mergeI18nTree(items.value, treeviewData)
  locales.value.push(locale)
}

/**
 * Merges two i18n trees with deepmerge.
 * @param x The first tree.
 * @param y The second tree.
 * @return The merged tree.
 */
function mergeI18nTree(x: TreeViewEntry[], y: TreeViewEntry[]) {
  // copy from: https://github.com/TehShrike/deepmerge?tab=readme-ov-file#arraymerge-example-combine-arrays
  const combineMerge = (target: any[], source: any[], options: merge.ArrayMergeOptions) => {
    const destination = target.slice()
    source.forEach((item, index: number) => {
      if (typeof destination[index] === 'undefined') {
        destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
      }
      else if (options.isMergeableObject(item)) {
        destination[index] = merge(target[index], item, options)
      }
      else if (!target.includes(item)) {
        destination.push(item)
      }
    })
    return destination
  }
  return merge(x, y, { arrayMerge: combineMerge })
}

/**
 * Recursively parses an i18n object into a tree structure.
 * @param i18nObject
 * @param localeKey
 * @param parentKey
 */
function parseI18n(i18nObject: I18nObject, localeKey: string, parentKey?: string) {
  const result: TreeViewEntry[] = []
  Object.entries(i18nObject).forEach(([key, value]) => {
    const item: TreeViewEntry = { title: key }
    const i18nKey = parentKey ? `${parentKey}.${key}` : key
    if (typeof value === 'string') {
      if (!item.value) {
        item.value = {}
      }
      item.value[localeKey] = value
      item.key = i18nKey
    }
    else if (isObject(value)) {
      item.children = parseI18n(value, localeKey, i18nKey)
    }
    else {
      // Handle unexpected value types
      console.warn(`Unexpected value type for key "${key}":`, value)
    }
    result.push(item)
  })
  return result
}

/**
 * Checks if a value is an object.
 * @param value The value to check.
 */
function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

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
    <div>selected: {{ selected }}</div>
    <div>!!selected: {{ !!selected?.[0] }}</div>
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
          <v-btn icon="mdi-content-copy" size="small" class="ml-2" @click.stop />
        </div>
        <v-divider />
        <div v-for="[locale, value] of Object.entries(selected[0].value)" :key="locale" class="py-2">
          <v-chip density="compact" :color="value ? 'default' : 'error'" class="mx-1">
            {{ locale }}
          </v-chip>
          {{ value }}
        </div>
      </div>
    </v-navigation-drawer>
  </v-container>
</template>
