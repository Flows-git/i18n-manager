<script setup lang="ts">
const locales = defineModel<Array<string | undefined>>({ default: () => [] })

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
  <div>
    <LocaleInput v-for="(locale, i) of locales" :key="i" :model-value="locale" label="Language" @update:model-value="updateLocale(i, $event as string)">
      <template #append>
        <v-btn
          v-tooltip="`Remove Language`" icon="mdi-minus" color="primary" variant="text" :disabled="locales.length === 1"
          @click="removeLocale(i)"
        />
      </template>
    </LocaleInput>
    <div class="text-center">
      <v-btn @click="addLocale()">
        <v-icon icon="mdi-plus" />
        Add Language
      </v-btn>
    </div>
  </div>
</template>
