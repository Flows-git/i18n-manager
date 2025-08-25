import * as fs from 'node:fs'
import * as path from 'node:path'
import * as process from 'node:process'

export function getLocalesFromDataFolder() {
  const dataFolder = path.join(process.cwd(), 'data')
  const locales: Array<string> = []
  fs.readdirSync(dataFolder).forEach((file) => {
    // add json file names as locale names
    if (file.endsWith('.json')) {
      locales.push(file.slice(0, file.length - 5))
    }
  })

  return locales
}
