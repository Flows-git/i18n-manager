<script setup lang="ts">
const { fetchI18nData } = useI18nAPI()
await fetchI18nData()
</script>

<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
