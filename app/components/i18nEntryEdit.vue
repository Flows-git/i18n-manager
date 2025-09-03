<script setup lang="ts">
const props = defineProps<{
  entry: I18nEntry
  locales: string[]
}>()

const emits = defineEmits<{
  save: [I18nEntry]
  cancel: []
  delete: []
}>()

const { showWarningDialog } = useConfirmDialog()

const item = ref<I18nEntry>(JSON.parse(JSON.stringify(props.entry)))

function saveEntry() {
  emits('save', item.value)
}

function cancelEdit() {
  emits('cancel')
}

async function deleteEntry() {
  if (await showWarningDialog(`Do you really want to delete the translation key "${item.value.key}"`)) {
    emits('delete')
  }
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
    <v-card-actions>
      <v-btn color="error" @click="deleteEntry">
        <v-icon icon="mdi-trash-can-outline" />
        Delete
      </v-btn>
      <v-spacer />
      <v-btn @click="cancelEdit">
        Cancel
      </v-btn>
      <v-btn color="primary" @click="saveEntry">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
