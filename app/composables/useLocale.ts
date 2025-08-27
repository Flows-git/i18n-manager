export function useLocale() {
  const allLocales = computed(() => Object.entries(languageCodes).map(([key, value]) => ({ key, title: `${key} (${value})` })))

  function getLocaleTitleByKey(key: string) {
    return allLocales.value.find(locale => locale.key === key)?.title ?? key
  }

  async function addNewLocale(locale: string) {
    await $fetch('/api/locales', {
      method: 'POST',
      body: {
        locale,
      },
    })
    await useI18nAPI().fetchI18nData()
  }

  return {
    allLocales,
    addNewLocale,
    getLocaleTitleByKey,
  }
}
