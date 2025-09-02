function getAllLocales() {
  return fileManager.getFileNames()
}

function createLocale(locale: string) {
  fileManager.createFile(locale)
}

function deleteLocale(locale: string) {
  fileManager.deleteFile(locale)
}

function updateLocaleName(oldName: string, newName: string) {
  fileManager.renameFile(oldName, newName)
}

export default {
  getAll: getAllLocales,
  create: createLocale,
  delete: deleteLocale,
  updateName: updateLocaleName,
}
