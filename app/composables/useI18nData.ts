export function useI18nData() {
  const allItems = useState<I18nItem[]>('i18n-items', () => [])
  const locales = useState<string[]>('i18n-locales', () => [])
  const folders = computed(() => allItems.value.filter(i => i.type === 'folder'))
  const searchValue = useState<string>('i18n-search-value')
  const itemFilter = useState<I18nSearchFilter>('i18n-items-filter', () => ({ missingOnly: false, showFolder: false }))

  const filteredItems = computed(() => {
    const missingOnly = itemFilter.value.missingOnly
    const showFolder = itemFilter.value.showFolder
    if (!missingOnly && showFolder) {
      return allItems.value
    }
    const items = allItems.value.filter(i => !(i.type === 'folder'))

    if (typeof missingOnly === 'string') {
      return items.filter(i => !i.value || !i.value[missingOnly])
    }
    if (missingOnly === true) {
      return items.filter(i => !i.value || Object.keys(i.value).length !== locales.value.length || Object.values(i.value).findIndex(v => v === '') >= 0)
    }
    return items
  })

  return {
    allItems,
    items: filteredItems,
    folders,
    itemFilter,
    locales,
    searchValue,
  }
}
