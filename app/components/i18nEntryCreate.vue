<script setup lang="ts">
const emits = defineEmits<{
  save: [I18nListEntry]
  cancel: []
}>()

const item = ref<I18nListEntry>({
  key: '',
  title: '',
  value: {},
})

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
          Create Translation
        </div>
      </div>

      <I18nEntryForm v-model="item" />
      <div>{{ item }}</div>
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
