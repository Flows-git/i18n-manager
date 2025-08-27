import { createNewLocale } from '../utils/locales'

export default defineEventHandler(async (event) => {
  const { locale } = await readBody<{ locale: string }>(event)
  createNewLocale(locale)
})
