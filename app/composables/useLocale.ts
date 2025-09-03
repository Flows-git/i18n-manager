export function useLocale() {
  const { showWarningDialog } = useConfirmDialog()
  const { fetchI18nData } = useI18nAPI()

  const allLocales = computed(() => Object.entries(languageCodes).map(([key, value]) => ({ key, title: `${key} (${value})` })))

  function getLocaleTitleByKey(key: string) {
    return allLocales.value.find(locale => locale.key === key)?.title ?? key
  }

  async function addNewLocale(locale: string | Array<string>) {
    await $fetch('/api/locales', {
      method: 'POST',
      body: {
        locale,
      },
    })
    await fetchI18nData()
  }

  async function updateLocales(changes: { create: Array<string>, remove: Array<string> }) {
    if (changes.remove.length && !await showWarningDialog({
      title: `Do you really want to delete the languages: ${changes.remove.toString()}`,
      message: `This will remove all translations for this language`,
    })) {
      return
    }

    await $fetch('/api/locales', {
      method: 'PUT',
      body: changes,
    })
    await fetchI18nData()
  }

  return {
    allLocales,
    addNewLocale,
    getLocaleTitleByKey,
    updateLocales,
  }
}
