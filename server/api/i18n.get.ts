import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'
import { mergeI18nTree, parseI18n } from '../utils/i18nTree'

export default defineEventHandler(() => {
  const dataFolder = path.join(process.cwd(), 'data')
  const locales: Array<string> = []
  fs.readdirSync(dataFolder).forEach((file) => {
    // add json file names as locale names
    if (file.endsWith('.json')) {
      locales.push(file.slice(0, file.length - 5))
    }
  })

  let data: Array<TreeViewEntry> = []
  locales.forEach((locale) => {
    const filePath = path.join(dataFolder, `${locale}.json`)
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      try {
        const jsonData = JSON.parse(fileContent)
        const treeviewData = parseI18n(jsonData, locale)
        data = mergeI18nTree(data, treeviewData)
      }
      catch (error) {
        console.error(`Error parsing JSON from ${filePath}:`, error)
      }
    }
  })

  return {
    locales,
    data,
  }
})
