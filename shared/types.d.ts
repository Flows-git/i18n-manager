interface I18nObject {
  [key: string]: string | I18nObject
}

interface TreeViewEntry {
  title: string
  value?: Record<string, string>
  key?: string
  children?: TreeViewEntry[]
}
