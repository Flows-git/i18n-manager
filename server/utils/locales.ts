export function getAllLocales() {
  return fileManager.getFileNames()
}

export function createLocale(locale: string) {
  fileManager.createFile(locale)
}

export default {
  getAll: getAllLocales,
  create: createLocale,
}
