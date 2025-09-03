export default defineEventHandler(async (event) => {
  const request = await readBody<{ create: Array<string>, remove: Array<string> }>(event)
  if (request.create) {
    request.create.forEach((l) => {
      locales.create(l)
    })
  }

  if (request.remove) {
    request.remove.forEach((l) => {
      locales.delete(l)
    })
  }
})
