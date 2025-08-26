import { readLocaleJson } from './locales'

export function getI18nListData() {
  const locales = getLocalesFromDataFolder()

  let data: Array<I18nListEntry> = []
  // Iterate over each locale, read its JSON data and parses the data to a flat array
  locales.forEach((locale) => {
    try {
      const jsonData = readLocaleJson(locale)
      const treeviewData = parseI18nList(jsonData, locale)
      data = mergeI18nListData(data, treeviewData)
    }
    catch (error) {
      console.error(`Error parsing JSON for locale: ${locale}:`, error)
    }
  })

  return data
}

function mergeI18nListData(data: Array<I18nListEntry>, newData: Array<I18nListEntry>) {
  const merged = [...data]

  newData.forEach((item) => {
    const existing = merged.find(i => i.key === item.key)
    if (existing) {
      existing.value = { ...existing.value, ...item.value }
    }
    else {
      merged.push(item)
    }
  })

  return merged
}

/**
 * Recursively parses an i18n object into a tree structure.
 * @param I18nJsonObject
 * @param localeKey
 * @param parentKey
 */
export function parseI18nList(I18nJsonObject: I18nJsonObject, localeKey: string, parentKey?: string) {
  const result: I18nListEntry[] = []
  Object.entries(I18nJsonObject).forEach(([key, value]) => {
    const i18nKey = parentKey ? `${parentKey}.${key}` : key
    const item: I18nListEntry = { title: key, key: i18nKey }
    if (typeof value === 'string') {
      item.value = { [localeKey]: value }
      result.push(item)
    }
    else if (isObject(value)) {
      // TODO: add hide/show folder option
      // item.isFolder = true
      // result.push(item)

      result.push(...parseI18nList(value, localeKey, i18nKey))
    }
    else {
      // Handle unexpected value types
      console.warn(`Unexpected value type for key "${key}":`, value)
    }
  })
  return result
}
