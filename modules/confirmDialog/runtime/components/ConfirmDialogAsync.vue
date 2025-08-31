<script lang="ts" setup>
const dialog = ref(false)
const options = ref<ConfirmDialogOptions>()
let resolve: any = null

function open(_options: ConfirmDialogOptions) {
  dialog.value = true
  options.value = _options
  return new Promise((_resolve) => {
    resolve = _resolve
  })
}
defineExpose({ open })

function resetPromise() {
  resolve = null
  setTimeout(() => {
    options.value = undefined
  }, 400)
}

watch(dialog, () => {
  if (!dialog.value && resolve) {
    resolve(false)
    resetPromise()
  }
})

function confirm() {
  resolve(true)
  resetPromise()
  dialog.value = false
}

function cancel() {
  dialog.value = false
}
</script>

<template>
  <v-dialog v-if="options" v-model="dialog" width="600" :persistent="options.persistent" style="z-index: 99999" @confirm="confirm">
    <v-card>
      <v-card-text class="d-flex w-100">
        <v-avatar v-if="options.icon" class="align-self-center mr-6" :color="options.color" size="96">
          <v-icon :icon="options.icon" size="80" />
        </v-avatar>
        <div class="w-100 d-flex justify-space-between">
          <div class="flex-grow-1">
            <div class="text-h5" style="line-break: anywhere;">
              {{ options.title }}
            </div>
            <div>{{ options.message }}</div>
          </div>
          <v-btn class="mr-n5 mt-n3" icon="$close" variant="text" @click="cancel" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">
          {{ options.cancelText ?? 'Abbrechen' }}
        </v-btn>
        <v-btn :color="options.color" variant="tonal" min-width="100" @click="confirm">
          {{ options.confirmText ?? 'Ok' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
