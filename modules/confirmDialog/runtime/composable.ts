export function useConfirmDialog() {
  function showDialog(options: ConfirmDialogOptions | string): Promise<boolean> {
    return useState<any>('confirm-dialog-ref').value?.open(parseOptions(options))
  }

  const showSuccessDialog: typeof showDialog = options =>
    showDialog(setOptions(parseOptions(options), '$success', 'success'))

  const showErrorDialog: typeof showDialog = options =>
    showDialog(setOptions(parseOptions(options), '$error', 'error'))

  const showInfoDialog: typeof showDialog = options =>
    showDialog(setOptions(parseOptions(options), '$info', 'info'))

  const showWarningDialog: typeof showDialog = options =>
    showDialog(setOptions(parseOptions(options), '$warning', 'warning'))

  return {
    showDialog,
    showSuccessDialog,
    showErrorDialog,
    showWarningDialog,
    showInfoDialog,
  }
}

function parseOptions(options: ConfirmDialogOptions | string): ConfirmDialogOptions {
  if (typeof options === 'string') {
    return { title: options }
  }
  return options
}

function setOptions(options: ConfirmDialogOptions, icon: string, color: string) {
  return {
    icon,
    ...options,
    color,
  }
}
