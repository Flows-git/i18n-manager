<script setup lang="ts">
const emits = defineEmits<{
  created: []
  cancel: []
}>()

const locale = ref<string>()

const { allLocales, addNewLocale } = useLocale()

const error = ref()
const loading = ref<boolean>(false)

async function createLocale() {
  if (locale.value) {
    error.value = undefined
    loading.value = true
    try {
      await addNewLocale(locale.value)
      emits('created')
    }
    catch (err) {
      error.value = err
    }
    loading.value = false
  }
}
</script>

<template>
  <v-card>
    <v-card-text>
      <v-autocomplete v-model="locale" :items="allLocales" label="Select New Language" item-value="key" :disabled="loading" :error-messages="error?.message ? [error.message] : []" />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn :disabled="!locale" :loading="loading" @click="createLocale">
        Create Locale
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
