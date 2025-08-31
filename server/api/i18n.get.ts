import { getI18nListData } from '../utils/i18nList'
import { getLocalesFromDataFolder } from '../utils/locales'

/**
 * Returns all translations and locales based on the json files in the /data folder
 * for v-tree-view
 */
export default defineEventHandler(async () => {
  return {
    locales: getLocalesFromDataFolder(),
    data: getI18nListData(),
  }
})
