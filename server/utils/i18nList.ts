import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'

export function getI18nListData() {
  const dataFolder = path.join(process.cwd(), 'data')
  const locales = getLocalesFromDataFolder()

  let data: Array<I18nListEntry> = []
  locales.forEach((locale) => {
    const filePath = path.join(dataFolder, `${locale}.json`)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      try {
        const jsonData = JSON.parse(fileContent)
        const treeviewData = parseI18nList(jsonData, locale)
        data = mergeI18nListData(data, treeviewData)
      }
      catch (error) {
        console.error(`Error parsing JSON from ${filePath}:`, error)
      }
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
 * @param i18nObject
 * @param localeKey
 * @param parentKey
 */
export function parseI18nList(i18nObject: I18nObject, localeKey: string, parentKey?: string) {
  const result: I18nListEntry[] = []
  Object.entries(i18nObject).forEach(([key, value]) => {
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
