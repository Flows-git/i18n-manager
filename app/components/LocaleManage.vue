<script setup lang="ts">
const emits = defineEmits<{
  updated: []
  cancel: []
}>()

const { locales: _locales } = useI18nAPI()
const { updateLocales } = useLocale()
const locales = ref<Array<string | undefined>>([..._locales.value])

const changes = computed(() => {
  const create = locales.value.filter(l => !_locales.value.find(lo => lo === l)).filter(l => typeof l === 'string')
  const remove = _locales.value.filter(l => !locales.value.find(lo => lo === l))

  return {
    create,
    remove,
  }
})
const hasChanges = computed(() => changes.value.create.length > 0 || changes.value.remove.length > 0)
const hasLocalesSet = computed(() => locales.value.find(l => typeof l === 'string'))
const canSubmit = computed(() => hasChanges.value && hasLocalesSet.value)

async function saveChanges() {
  if (hasChanges.value) {
    await updateLocales(changes.value)
    emits('updated')
  }
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card width="400">
      <v-card-title>Manage Languages</v-card-title>
      <v-card-text>
        <LocaleInputList v-model="locales" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="emits('cancel')">
          Cancel
        </v-btn>
        <v-btn :disabled="!canSubmit" @click="saveChanges">
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
