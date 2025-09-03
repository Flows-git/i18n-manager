export function useI18nData() {
  const allItems = useState<I18nItem[]>('i18n-items', () => [])
  const locales = useState<string[]>('i18n-locales', () => [])
  const items = computed(() => allItems.value.filter(i => i.type !== 'folder'))
  const folders = computed(() => allItems.value.filter(i => i.type === 'folder'))
  const searchValue = useState<string>('i18n-search-value')

  return {
    allItems,
    items,
    folders,
    locales,
    searchValue,
  }
}
