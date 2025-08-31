<script setup lang="ts">
import ConfirmDialogAsync from './ConfirmDialogAsync.vue'

const confirm = ref()

onMounted(() => {
  useState('confirm-dialog-ref', () => confirm)
})
</script>

<template>
  <ConfirmDialogAsync ref="confirm" />
</template>
