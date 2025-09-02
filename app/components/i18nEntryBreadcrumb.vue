<script setup lang="ts">
const props = defineProps<{
  item: I18nItem
}>()

const breadcrumbs = computed(() => {
  const items = props.item.key.split('.')
  return items
})
</script>

<template>
  <div class="d-flex justify-center text-body-2 bg-primary mx-n6">
    <v-icon icon="mdi-folder" size="small" class="align-self-center ml-2" />
    <v-breadcrumbs :items="breadcrumbs" class="py-1 pl-1 d-block">
      <template #prepend />
    </v-breadcrumbs>
  </div>
</template>
