import { createVuetify } from 'vuetify'
import { aliases } from 'vuetify/iconsets/mdi-svg'
import { de } from 'vuetify/locale'

import { defaultProps } from './vuetify.defaults'
import { dark, light } from './vuetify.themes'
import '~/assets/main.scss'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: 'de',
      messages: { de },
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        light,
        dark,
      },
    },
    defaults: defaultProps,
    icons: {
      aliases,
    },
  })
  app.vueApp.use(vuetify)

  // changes the theme to user prefered theme :)
  app.hooks.addHooks({ 'app:mounted': () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    vuetify.theme.global.name.value = prefersDark ? 'dark' : 'light'
  } })

  if (import.meta.client) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      vuetify.theme.global.name.value = e.matches ? 'dark' : 'light'
    })
  }
})
