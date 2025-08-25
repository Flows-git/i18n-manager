/**
 * Checks if a value is an object.
 * @param value The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}
