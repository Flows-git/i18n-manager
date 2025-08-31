import { getI18nTreeData } from '../utils/i18nTree'
import { getLocalesFromDataFolder } from '../utils/locales'

/**
 * Returns all translations and locales based on the json files in the /data folder
 * for v-tree-view
 */
export default defineEventHandler(() => {
  const locales = getLocalesFromDataFolder()

  const data = getI18nTreeData()

  return {
    locales,
    data,
  }
})
