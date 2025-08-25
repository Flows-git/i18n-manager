import { getI18nTreeData } from '../utils/i18nTree'
import { getLocalesFromDataFolder } from '../utils/locales'

export default defineEventHandler(() => {
  const locales = getLocalesFromDataFolder()

  const data = getI18nTreeData()

  return {
    locales,
    data,
  }
})
