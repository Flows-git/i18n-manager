<script setup lang="ts">
defineProps<{
  loading?: boolean
  label: string
}>()
const locale = defineModel<string>()

const { allLocales } = useLocale()
</script>

<template>
  <v-autocomplete v-model="locale" :items="allLocales" :label="label" item-value="key" :disabled="loading">
    <template v-for="(slot, index) of Object.keys($slots)" :key="index" #[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </v-autocomplete>
</template>
