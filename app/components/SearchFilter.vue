<script setup lang="ts">
const { locales, itemFilter } = useI18nData()

const items = computed(() => {
  const i: Array<{ value: boolean | string, title: string }> = [
    { value: false, title: 'Show All Items' },
    { value: true, title: 'Only Missing Items' },
  ]
  locales.value.forEach((l) => {
    i.push({ value: l, title: `Missing Items in ${l}` })
  })

  return i
})
</script>

<template>
  <v-card width="360">
    <!-- <v-card-title>Searchfilter</v-card-title> -->
    <v-card-text>
      <v-select v-model="itemFilter.missingOnly" label="Filter" :items="items" color="primary" hide-details @click.stop />
      <v-checkbox v-if="!itemFilter.missingOnly" v-model="itemFilter.showFolder" label="show Folders" color="primary" hide-details @click.stop />
    </v-card-text>
  </v-card>
</template>
