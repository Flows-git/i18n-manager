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

const icon = computed(() => currentTheme.value === 'light' ? 'ph:moon-stars-duotone' : 'ph:sun-duotone')

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-btn icon @click="toggleTheme">
    <Icon :name="icon" size="20" />
  </v-btn>
</template>
