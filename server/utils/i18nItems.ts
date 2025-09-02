function listI18nItems() {
  const allLocales = locales.getAll()

  let data: Array<I18nItem> = []
  // Iterate over each locale, read its JSON data and parses the data to a flat array
  allLocales.forEach((locale) => {
    try {
      const jsonData = fileManager.readFile(locale)
      const parsedData = parseI18nList(jsonData, locale)
      data = mergeI18nListData(data, parsedData)
    }
    catch (error) {
      console.error(`Error parsing JSON for locale: ${locale}:`, error)
    }
  })

  return data
}

function mergeI18nListData(data: Array<I18nItem>, newData: Array<I18nItem>) {
  const merged = [...data]

  newData.forEach((item) => {
    const existing = merged.find(i => i.key === item.key)
    if (existing) {
      // merge language values of I18nEntry
      if (item.type === 'entry' && existing.type === 'entry') {
        existing.value = { ...existing.value, ...item.value }
      }
    }
    else {
      merged.push(item)
    }
  })

  return merged
}

/**
 * Recursively parses an i18n object into a flat structure.
 * @param I18nJsonObject
 * @param localeKey
 * @param parentKey
 */
function parseI18nList(I18nJsonObject: I18nJsonObject, localeKey: string, parentKey?: string) {
  const result: I18nItem[] = []
  Object.entries(I18nJsonObject).forEach(([key, value]) => {
    const i18nKey = parentKey ? `${parentKey}.${key}` : key
    const baseItem: I18nBaseItem = { title: key, key: i18nKey }
    if (typeof value === 'string') {
      const item: I18nEntry = { ...baseItem, type: 'entry', value: { [localeKey]: value } }
      result.push(item)
    }
    else if (isObject(value)) {
      const item: I18nFolder = { ...baseItem, type: 'folder' }
      result.push(item)
      // parse keys of child object
      result.push(...parseI18nList(value as I18nJsonObject, localeKey, i18nKey))
    }
    else {
      // Handle unexpected value types
      console.warn(`Unexpected value type for key "${key}":`, value)
    }
  })
  return result
}

function createI18nItem(item: I18nEntry) {
  const data = listI18nItems()

  const entry = data.find(i => i.key === item.key)
  if (entry) {
    throw createError({
      statusCode: 400,
      statusMessage: 'translation already exists',
    })
  }
  if (item.value) {
    Object.entries(item.value).forEach(([locale, value]) => {
      localeFile.updateKey(locale, item.key, value)
    })
  }
}

function updatei18nItem(item: I18nEntry) {
  const data = listI18nItems()

  const entry = data.find(i => i.key === item.key) as I18nEntry
  if (!entry) {
    throw createError({
      statusCode: 400,
      statusMessage: 'translation key not found',
    })
  }
  if (item.type === 'entry') {
    Object.entries(item.value).forEach(([locale, value]) => {
      if (entry.value && entry.value[locale] === value)
        return // no change
      localeFile.updateKey(locale, item.key, value)
    })
  }
}

function deleteI18nItem(item: I18nEntry) {
  const data = listI18nItems()

  const entry = data.find(i => i.key === item.key) as I18nEntry
  if (!entry) {
    throw createError({
      statusCode: 400,
      statusMessage: 'translation key not found',
    })
  }
  Object.entries(entry.value).forEach(([locale]) => {
    localeFile.deleteKey(locale, item.key)
  })
}

export default {
  list: listI18nItems,
  create: createI18nItem,
  update: updatei18nItem,
  delete: deleteI18nItem,
}
