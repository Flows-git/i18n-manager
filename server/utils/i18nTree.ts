import merge from 'deepmerge'
import { isObject } from './helper'

/**
 * Merges two i18n trees with deepmerge.
 * @param x The first tree.
 * @param y The second tree.
 * @return The merged tree.
 */
export function mergeI18nTree(x: TreeViewEntry[], y: TreeViewEntry[]) {
  // copy from: https://github.com/TehShrike/deepmerge?tab=readme-ov-file#arraymerge-example-combine-arrays
  const combineMerge = (target: any[], source: any[], options: merge.ArrayMergeOptions) => {
    const destination = target.slice()
    source.forEach((item, index: number) => {
      if (typeof destination[index] === 'undefined') {
        destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
      }
      else if (options.isMergeableObject(item)) {
        destination[index] = merge(target[index], item, options)
      }
      else if (!target.includes(item)) {
        destination.push(item)
      }
    })
    return destination
  }
  return merge(x, y, { arrayMerge: combineMerge })
}

/**
 * Recursively parses an i18n object into a tree structure.
 * @param i18nObject
 * @param localeKey
 * @param parentKey
 */
export function parseI18n(i18nObject: I18nObject, localeKey: string, parentKey?: string) {
  const result: TreeViewEntry[] = []
  Object.entries(i18nObject).forEach(([key, value]) => {
    const item: TreeViewEntry = { title: key }
    const i18nKey = parentKey ? `${parentKey}.${key}` : key
    if (typeof value === 'string') {
      if (!item.value) {
        item.value = {}
      }
      item.value[localeKey] = value
      item.key = i18nKey
    }
    else if (isObject(value)) {
      item.children = parseI18n(value, localeKey, i18nKey)
    }
    else {
      // Handle unexpected value types
      console.warn(`Unexpected value type for key "${key}":`, value)
    }
    result.push(item)
  })
  return result
}
