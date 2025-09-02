/**
 * Returns all translations and locales based on the json files in the /data folder
 * for v-tree-view
 */
export default defineEventHandler(() => {
  return {
    locales: locales.getAll(),
    data: getI18nTreeData(),
  }
})
