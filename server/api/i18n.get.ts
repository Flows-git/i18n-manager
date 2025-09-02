/**
 * Returns all translations and locales based on the json files in the /data folder
 * for v-tree-view
 */
export default defineEventHandler(async () => {
  return {
    locales: locales.getAll(),
    data: i18nItems.list(),
  }
})
