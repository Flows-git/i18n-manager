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
function geti18nFilePath(locale: string) {
  const filePath = path.join(geti18nFolderPath(), `${locale}.json`)
  // check if file exists
  if (!fs.existsSync(filePath)) {
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
