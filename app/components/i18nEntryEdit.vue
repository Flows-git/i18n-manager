<script setup lang="ts">
import I18nEntryBreadcrumb from './i18nEntryBreadcrumb.vue'

const props = defineProps<{
  entry: I18nEntry
  locales: string[]
}>()

const emits = defineEmits<{
  save: [I18nEntry]
  cancel: []
}>()

const item = ref<I18nEntry>(JSON.parse(JSON.stringify(props.entry)))

function saveEntry() {
  emits('save', item.value)
}

function cancelEdit() {
  emits('cancel')
}
</script>

<template>
  <v-card>
    <v-card-text class="pb-0">
      <div class="text-center">
        <v-icon icon="mdi-earth" size="40" color="primary" />
        <div class="pb-1">
          Edit Translation
        </div>
      </div>
      <I18nEntryBreadcrumb :item="item" class="mb-4" />
      <I18nEntryForm v-model="item" key-readonly />
    </v-card-text>
    <v-divider />
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancelEdit">
        Cancel
      </v-btn>
      <v-btn color="primary" @click="saveEntry">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
