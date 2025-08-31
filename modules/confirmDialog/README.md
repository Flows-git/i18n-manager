# Confirm Dialog Nuxt Module
[![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00C58E?logo=nuxt.js)](https://nuxt.com/)
[![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify)](https://vuetifyjs.com/)

This module provides a awaitable confirmation dialog component for Nuxt applications. It allows you to prompt users for confirmation before performing critical actions.

## Features

- Easy integration with Nuxt
- Customizable dialog text and actions
- Emits events for confirm and cancel

## Installation

Copy the `confirmDialog` module into your Nuxt project's `modules` directory.

1. Register the module in your `nuxt.config.ts`:

  ```ts
  export default defineNuxtConfig({
    modules: [
     '~/modules/confirmDialog'
    ]
  })
  ```

2. Add the dialog component to your `app.vue`:

  ```tsx
  <template>
    <v-app>
      <ConfirmDialog />
    </v-app>
  </template>
  ```

## Usage
To use the confirmation dialog, you can call the `useConfirmDialog` composable in your components:

```ts
showDialog({
  text: 'Are you sure you want to delete this item?',
  confirmText: 'Delete',
  cancelText: 'Cancel'
  messsage: 'This action cannot be undone.'
  icon: 'mdi-delete',
  color: 'error',
  persistent: false
})
```

```html
<script setup lang="ts">
const { showDialog } = useConfirmDialog()

function deleteItem() {
  if(await showDialog('Are you sure you want to delete this item?')) {
    // Handle confirm
  } else {
    // Handle cancel
  }
}
</script>
```

use specific confirmation dialog types (error, warning, info, success)
this functions are just shortcuts for the `showDialog` function with predefined icon and color:
```ts
showErrorDialog('An error occurred while deleting the item.')
showWarningDialog('Are you sure you want to proceed?')
showInfoDialog('This is an informational message.')
showSuccessDialog('The item was deleted successfully.')
```

## Customization

You can customize the dialog's appearance and behavior by editing the component inside the module.
