import { updateLocaleJson } from '../utils/locales'

/**
 * Updates an existing translation entry
 */
export default defineEventHandler(async (event) => {
  const item = await readBody<I18nListEntry>(event)
  const data = getI18nListData()

  const entry = data.find(i => i.key === item.key)
  if (!entry) {
    throw createError({
      statusCode: 400,
      statusMessage: 'translation key not found',
    })
  }
  if (item.value) {
    Object.entries(item.value).forEach(([locale, value]) => {
      if (entry.value && entry.value[locale] === value)
        return // no change
      updateLocaleJson(locale, item.key, value)
    })
  }
})
