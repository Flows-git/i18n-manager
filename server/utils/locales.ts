import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'

/**
 * Gets the path to the i18n folder.
 * @returns The absolute path to the i18n folder.
 */
function geti18nFolderPath() {
  return path.join(process.cwd(), 'data')
}

/**
 * Gets the path to a specific locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @returns The absolute path to the locale JSON file.
 * @throws Will throw an error if the file does not exist.
 */
function geti18nFilePath(locale: string, mustExist = true) {
  const filePath = path.join(geti18nFolderPath(), `${locale}.json`)
  // check if file exists
  if (mustExist && !fs.existsSync(filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: `JSON file ${filePath} not found`,
    })
  }
  return filePath
}

/**
 * Gets the list of available locales (json files) from the data folder.
 * @returns An array of locale identifiers (filenames without extensions).
 */
export function getLocalesFromDataFolder() {
  const dataFolder = geti18nFolderPath()
  const locales: Array<string> = []
  fs.readdirSync(dataFolder).forEach((file) => {
    // add json file names as locale names
    if (file.endsWith('.json')) {
      locales.push(file.slice(0, file.length - 5))
    }
  })
  return locales
}

/**
 * Reads a locale JSON file from data folder.
 * @param locale The locale identifier (filename without extension)
 * @returns The parsed JSON content.
 * @throws Will throw an error if the file does not exist or if parsing fails.
 */
export function readLocaleJson(locale: string): I18nJsonObject {
  const filePath = geti18nFilePath(locale)
  try {
    // read, parse and return file content
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Error parsing JSON from ${filePath}`,
      cause: error,
    })
  }
}

/**
 * Updates a specific key in a locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @param i18nKey The key to update (dot-separated path)
 * @param newValue The new value to set
 * @throws Will throw an error if the file does not exist or if parsing fails.
 */
export function updateLocaleJson(locale: string, i18nKey: string, newValue: string) {
  const keys = i18nKey.split('.')
  const i18nObject = readLocaleJson(locale)

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
  fs.writeFileSync(geti18nFilePath(locale), JSON.stringify(i18nObject, null, 2))
}

/**
 * Deletes a specific key in a locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @param i18nKey The key to delete (dot-separated path)
 */
export function deleteLocaleJson(locale: string, i18nKey: string) {
  const i18nObject = readLocaleJson(locale)
  const keys = i18nKey.split('.')

  function recursiveDelete(obj: I18nJsonObject, keys: string[], index = 0) {
    const key = keys[index]

    if (!(key in obj)) {
      throw new Error(`Translation key "${i18nKey})" not found (eror at: ${keys.slice(0, index + 1).join('.')})`)
    }

    if (index === keys.length - 1) {
      // delete last key
      delete obj[key]
    }
    else {
      // go to next level
      const shouldDelete = recursiveDelete(obj[key] as I18nJsonObject, keys, index + 1)

      if (shouldDelete) {
        delete obj[key]
      }
    }

    // true zurückgeben, wenn aktuelles Objekt nach dem Löschen leer ist
    return Object.keys(obj).length === 0
  }

  recursiveDelete(i18nObject, keys)

  // write the updated i18nObject back to the JSON file
  fs.writeFileSync(geti18nFilePath(locale), JSON.stringify(i18nObject, null, 2))
}

/**
 * Creates a new locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @throws Will throw an error if the file already exists.
 */
export function createNewLocale(locale: string) {
  const filePath = geti18nFilePath(locale, false)
  if (fs.existsSync(filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Locale ${locale} already exists`,
    })
  }
  fs.writeFileSync(filePath, JSON.stringify({}, null, 2))
}
