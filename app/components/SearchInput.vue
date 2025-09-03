<script setup lang="ts">
const { itemFilter, searchValue } = useI18nData()

const hasFiler = computed(() => itemFilter.value.missingOnly !== false || itemFilter.value.showFolder !== false)
</script>

<template>
  <div class="d-flex">
    <div class="pr-3">
      <v-text-field
        v-model="searchValue" label="Search Translation" color="primary" hide-details density="comfortable" width="300px"
        append-inner-icon="mdi-magnify"
      />
    </div>
    <!-- filter menu -->
    <v-menu min-width="80">
      <template #activator="{ props }">
        <v-badge :model-value="hasFiler" location="top right" color="primary" dot offset-x="10" offset-y="10">
          <v-btn icon="mdi-filter" v-bind="props" />
        </v-badge>
      </template>
      <SearchFilter />
    </v-menu>
  </div>
</template>
