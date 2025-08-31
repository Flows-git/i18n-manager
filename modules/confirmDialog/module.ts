import { addComponent, addImports, createResolver, defineNuxtModule } from 'nuxt/kit'

const runtimeDir = 'runtime'

const module = defineNuxtModule({
  meta: {
    name: '@codamic/nuxt-vuetify-confirm-dialog',
    compatibility: {
      nuxt: '>3.0.0',
    },
  },
  defaults: {},
  setup() {
    // helper to resolve relative urls
    const { resolve } = createResolver(import.meta.url)

    // provide confirm-dialog component
    addComponent({
      name: 'NuxtVuetifyConfirmDialog',
      filePath: resolve(runtimeDir, 'components', 'ConfirmDialogWrapper.vue'),
      global: true,
    })

    // Enable plugin usage as composable - useConfirmDialog()
    const composables = resolve(runtimeDir, 'composable')
    addImports({ from: composables, name: 'useConfirmDialog' })
  },
})

export { module as default }
