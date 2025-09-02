<script setup lang="ts">
const { addNewLocale } = useLocale()

const selectedLocales = ref<Array<string | undefined>>([undefined])

async function createLocales() {
  try {
    await addNewLocale(selectedLocales.value.filter(l => typeof l === 'string'))
  }
  catch (error) {
    console.error(error)
  }
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
        <LocaleInput v-for="(locale, i) of selectedLocales" :key="i" :model-value="locale" label="Language" @update:model-value="selectedLocales[i] = $event">
          <template #append>
            <v-btn v-tooltip="`Remove Language`" icon="mdi-minus" color="primary" variant="text" :disabled="selectedLocales.length === 1" @click="selectedLocales = selectedLocales.filter((l, index) => index !== i)" />
          </template>
        </LocaleInput>
        <div class="text-center">
          <v-btn @click="selectedLocales.push(undefined)">
            <v-icon icon="mdi-plus" />
            Add Language
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn :disabled="!selectedLocales.find(l => typeof l === 'string')" @click="createLocales">
          Create Languages
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
