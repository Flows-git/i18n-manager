import { deleteLocaleJson } from '../utils/locales'

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
      deleteLocaleJson(locale, item.key)
    })
  }
})
