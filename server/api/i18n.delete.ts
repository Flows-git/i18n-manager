/**
 * Updates an existing translation entry
 */
export default defineEventHandler(async (event) => {
  const item = await readBody<I18nEntry>(event)
  i18nItems.delete(item)
})
