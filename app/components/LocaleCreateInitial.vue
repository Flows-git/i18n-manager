<script setup lang="ts">
const { addNewLocale } = useLocale()

const locales = ref<Array<string | undefined>>([undefined])

async function createLocales() {
  try {
    await addNewLocale(locales.value.filter(l => typeof l === 'string'))
  }
  catch (error) {
    console.error(error)
  }
}

function updateLocale(index: number, newName: string) {
  locales.value[index] = newName
}

function removeLocale(index: number) {
  locales.value = locales.value.filter((_, i) => i !== index)
}

function addLocale() {
  locales.value.push(undefined)
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card width="400">
      <v-card-text>
        <v-alert type="info">
          Add minimum one language to start
        </v-alert>
      </v-card-text>
      <v-card-text>
        <LocaleInputList :locales="locales" @add-locale="addLocale" @remove-locale="removeLocale" @update-locale="updateLocale" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn :disabled="!locales.find(l => typeof l === 'string')" @click="createLocales">
          Create Languages
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
