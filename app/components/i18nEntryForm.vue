<script setup lang="ts">
defineProps<{
  titleDisabled?: boolean
}>()

const item = defineModel<I18nListEntry>({ required: true })

const { getLocaleTitleByKey } = useLocale()
const { locales, folders } = useI18nAPI()

const folderSearchValue = ref()
function blurFolderInput() {
  if (folderSearchValue.value !== item.value.key) {
    item.value.key = folderSearchValue.value || ''
  }
}
</script>

<template>
  <div>
    <!-- <v-text-field v-model="item.title" label="translation key" color="primary" :disabled="titleDisabled" /> -->
    <v-autocomplete
      v-model="item.key"
      v-model:search="folderSearchValue"
      label="translation key"
      :items="folders"
      item-title="key"
      item-value="key"
      color="primary"
      class="mb-4"
      @blur="blurFolderInput"
    />
    <template v-if="item.value">
      <v-divider />
      <div class="py-1 text-body-2 text-primary">
        Translations
      </div>
      <template v-for="locale of locales" :key="locale">
        <v-text-field v-model="item.value[locale]" :label="getLocaleTitleByKey(locale)" color="primary" />
      </template>
    </template>
  </div>
</template>
