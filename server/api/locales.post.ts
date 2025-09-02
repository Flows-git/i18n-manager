export default defineEventHandler(async (event) => {
  const { locale } = await readBody<{ locale: string }>(event)
  locales.create(locale)
})
