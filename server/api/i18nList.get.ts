import { getI18nListData } from '../utils/i18nList'
import { getLocalesFromDataFolder } from '../utils/locales'

export default defineEventHandler(() => {
  const locales = getLocalesFromDataFolder()

  const data = getI18nListData()

  return {
    locales,
    data,
  }
})
