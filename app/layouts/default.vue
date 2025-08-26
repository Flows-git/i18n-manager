<script setup lang="ts">
const searchValue = useState('i18n-search-value')
</script>

<template>
  <div>
    <v-app-bar>
      <v-app-bar-title>i18n UI</v-app-bar-title>
      <v-spacer />
      <div class="px-3">
        <v-text-field v-model="searchValue" label="Übersetzung suchen" hide-details density="compact" width="300px" append-inner-icon="mdi-magnify" />
      </div>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </div>
</template>
