export function useI18nAPI() {
  const items = useState<I18nListEntry[]>('i18n-items', () => [])
  const locales = useState<string[]>('i18n-locales', () => [])
  const loading = useState<boolean>('i18n-loading', () => false)

  async function fetchI18nData() {
    loading.value = true
    try {
      const result = await $fetch('/api/i18nList')
      items.value = result.data
      locales.value = result.locales
    }
    catch (error) {
      throw new Error('Failed to fetch i18n data', { cause: error })
    }
    loading.value = false
  }

  async function updateI18nEntry(entry: I18nListEntry) {
    await $fetch('/api/i18n', {
      method: 'POST',
      body: entry,
    })
    await fetchI18nData()
  }
  return {
    items,
    locales,
    loading,
    fetchI18nData,
    updateI18nEntry,
  }
}
