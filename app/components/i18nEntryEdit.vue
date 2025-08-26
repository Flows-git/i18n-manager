<script setup lang="ts">
const props = defineProps<{
  entry: I18nListEntry
  locales: string[]
}>()

const emits = defineEmits<{
  save: [I18nListEntry]
  cancel: []
}>()

const item = ref<I18nListEntry>(JSON.parse(JSON.stringify(props.entry)))

function saveEntry() {
  emits('save', item.value)
}

function cancelEdit() {
  emits('cancel')
}

const breadcrumbs = computed(() => {
  const items = item.value.key.split('.')
  items.splice(-1)
  return items
})
</script>

<template>
  <v-card>
    <v-card-text class="pb-0">
      <div class="text-center">
        <v-icon icon="mdi-earth" size="40" color="primary" />
        <div class="pb-1">
          Übersetzung bearbeiten
        </div>
        <v-divider />
        <div class="d-flex justify-center text-body-2 bg-primary mx-n6">
          <v-icon icon="mdi-folder" size="small" class="align-self-center ml-2" />
          <v-breadcrumbs :items="breadcrumbs" class="py-1 pl-1 d-block">
            <template #prepend />
          </v-breadcrumbs>
        </div>
      </div>
      <v-divider class="mb-3" />
      <v-text-field v-model="item.title" label="translation key" color="primary" disabled />
      <template v-if="item.value">
        <v-divider />
        <div class="py-1 text-body-2 text-primary">
          Übersetzungen
        </div>
        <template v-for="locale of locales" :key="locale">
          <v-text-field v-model="item.value[locale]" :label="locale" color="primary" />
        </template>
      </template>
    </v-card-text>
    <v-divider />
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancelEdit">
        Abbrechen
      </v-btn>
      <v-btn color="primary" @click="saveEntry">
        Speichern
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
