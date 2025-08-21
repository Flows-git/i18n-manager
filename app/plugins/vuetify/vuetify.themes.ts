import type { ThemeDefinition } from 'vuetify'
import colors from 'vuetify/util/colors'

export const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#267f7a',
    // secondary: colors.blueGrey.base,

    error: colors.red.base,
    info: colors.blue.base,
    success: colors.green.base,
    warning: colors.amber.base,
  },
  variables: {
    // here you can overwrite vuetifys css variables
    // 'border-color': '#000000',
  },
}

export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#267f7a',
    // secondary: colors.blueGrey.base,

    error: colors.red.base,
    info: colors.blue.base,
    success: colors.green.base,
    warning: colors.amber.base,
  },
}
