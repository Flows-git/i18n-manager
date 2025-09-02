/**
 * Updates a specific key in a locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @param i18nKey The key to update (dot-separated path)
 * @param newValue The new value to set
 * @throws Will throw an error if the file does not exist or if parsing fails.
 */
function updateKeyInLocale(locale: string, i18nKey: string, newValue: string) {
  const keys = i18nKey.split('.')
  const i18nObject = fileManager.readFile(locale)

  // find i18nObject and ensure the i18nObject has the necessary structure
  let current = i18nObject
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    // create nested objects if they don't exist
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  // set the new value
  current[keys[keys.length - 1]] = newValue
  // write the updated i18nObject back to the JSON file
  fileManager.updateFile(locale, i18nObject)
}

/**
 * Deletes a specific key in a locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @param i18nKey The key to delete (dot-separated path)
 */
function deleteKeyInLocale(locale: string, i18nKey: string) {
  const i18nObject = fileManager.readFile(locale)
  const keys = i18nKey.split('.')

  function recursiveDelete(obj: I18nJsonObject, keys: string[], index = 0) {
    const key = keys[index]
    if (!(key in obj))
      throw new Error(`Translation key "${i18nKey})" not found (eror at: ${keys.slice(0, index + 1).join('.')})`)

    if (index === keys.length - 1) {
      delete obj[key] // delete last key
    }
    else {
      // go to next level
      const shouldDelete = recursiveDelete(obj[key] as I18nJsonObject, keys, index + 1)
      if (shouldDelete) {
        delete obj[key]
      }
    }

    // returns true when the object is empty after delete
    return Object.keys(obj).length === 0
  }

  recursiveDelete(i18nObject, keys)

  // write the updated i18nObject back to the JSON file
  fileManager.updateFile(locale, i18nObject)
}

export default {
  updateKey: updateKeyInLocale,
  deleteKey: deleteKeyInLocale,
}
