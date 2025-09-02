import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'

/**
 * Gets the list of available locales (json files) from the data folder.
 * @returns An array of locale identifiers (filenames without extensions).
 */
function getFileNames() {
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
function readFile(locale: string): I18nJsonObject {
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
 * Overwrites a locale JSON file from data folder with new Content.
 * @param locale The locale identifier (filename without extension)
 * @param newFile new JSON content
 * @throws Will throw an error if the file does not exist or if updating fails.
 */
function updateFile(locale: string, newFile: I18nJsonObject) {
  const filePath = geti18nFilePath(locale)
  try {
    // read, parse and return file content
    fs.writeFileSync(filePath, JSON.stringify(newFile, null, 2))
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Error updating JSON from ${filePath}`,
      cause: error,
    })
  }
}

/**
 * Creates a new locale JSON file.
 * @param locale The locale identifier (filename without extension)
 * @throws Will throw an error if the file already exists.
 */
function createFile(locale: string) {
  const filePath = geti18nFilePath(locale, false)
  if (fs.existsSync(filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Locale ${locale} already exists`,
    })
  }
  fs.writeFileSync(filePath, JSON.stringify({}, null, 2))
}

function deleteFile(locale: string) {
  const filePath = geti18nFilePath(locale, false)
  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Locale ${locale} does not exist`,
    })
  }
  fs.unlink(filePath, (err) => {
    if (err)
      throw err
  })
}

function renameFile(oldName: string, newName: string) {
  const filePath = geti18nFilePath(oldName, false)
  const newFilePath = geti18nFilePath(newName, false)
  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Locale ${oldName} does not exist`,
    })
  }
  fs.rename(filePath, newFilePath, (err) => {
    if (err)
      throw err
  })
}

// Helper

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

export default {
  getFileNames,
  readFile,
  updateFile,
  createFile,
  deleteFile,
  renameFile,
}
