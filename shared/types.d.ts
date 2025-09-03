// structure of the i18n JSON files
interface I18nJsonObject {
  [key: string]: string | I18nJsonObject
}
interface I18nBaseItem {
  type?: 'entry' | 'folder'
  title: string
  key: string
}

interface I18nEntry extends I18nBaseItem {
  type: 'entry'
  value: Record<string, string>
}

interface I18nFolder extends I18nBaseItem {
  type: 'folder'
}

type I18nItem = I18nEntry | I18nFolder

interface I18nSearchFilter {
  missingOnly?: boolean | 'string'
  showFolder?: boolean
}

/* deprecated */
interface TreeViewEntry {
  title: string
  value?: Record<string, string>
  key?: string
  children?: TreeViewEntry[]
}
