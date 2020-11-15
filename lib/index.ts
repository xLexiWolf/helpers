/**
 * Works just like ES6 array.map() but for objects.
 * @param object The object to map.
 * @param callback Callback function with access to the value or key.
 * @returns An array filled with the return values of callback.
 */
export type ValueOf<T> = T[keyof T]
export function mapObject<T, K extends object>(
  object: K,
  callback: (value: ValueOf<K>, key: string) => T
): T[] {
  return Object.keys(object).map((key) => callback(object[key], key))
}

/**
 * Smooth scrolls to the top of the window.
 */
export const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

/**
 * Formats a number and returns it as a currency string.
 * @param number - The number to format.
 * @param currency - Currency to format with (Optional, defaults to 'GBP').
 * @param locale - Locale to format with (Optional, defaults to 'en-GB').
 * @returns The number as a currency string.
 */
export const toCurrencyString = (
  number: number,
  currency?: string,
  locale?: string
) =>
  number.toLocaleString(locale || 'en-GB', {
    currency: currency || 'GBP',
    minimumFractionDigits: 2,
    style: 'currency'
  })
