export default defineEventHandler(async (event) => {
  const { locale } = await readBody<{ locale: string | Array<string> }>(event)
  if (Array.isArray(locale)) {
    locale.forEach((l) => {
      locales.create(l)
    })
  }
  else {
    locales.create(locale)
  }
})
