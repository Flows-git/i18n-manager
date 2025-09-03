<script setup lang="ts">
import { useTheme } from 'vuetify'

const { global, change } = useTheme()
const currentTheme = computed({
  get: () => global.name.value,
  set: (val) => {
    if (val !== global.name.value) {
      change(val)
    }
  },
})
</script>

<template>
  <v-switch v-model="currentTheme" class="theme-switch" false-value="light" true-value="dark" hide-details @click.stop>
    <template #prepend>
      <v-icon icon="mdi-weather-sunny" @click="currentTheme = 'light'" />
    </template>
    <template #append>
      <v-icon icon="mdi-weather-night" @click="currentTheme = 'dark'" />
    </template>
  </v-switch>
</template>

<style>
.theme-switch .v-switch__track{
  border: 1px solid !important
}
</style>
