import type { createVuetify } from 'vuetify'

export const defaultProps: NonNullable<Parameters<typeof createVuetify>[0]>['defaults'] = {
  global: {
    // use id/name as default props for lists/selects etc. instead of value/title
    // itemValue: 'id',
    // itemTitle: 'name',
  },
  // Overwrite props in specific components like this:
  // VContainer: {
  //   fluid: true,
  // },
}
