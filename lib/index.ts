import _ from 'lodash'

/**
 * Encrypts a string.
 * @param secret The secret key to encrypt with.
 * @param string The string to encrypt.
 * @returns An encrypted version of the given string.
 */
export const b64Table =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
export function encrypt(key, data) {
  function xorEncrypt(key, data) {
    return _.map(data, function (c, i: number) {
      return c.charCodeAt(0) ^ key.charCodeAt(Math.floor(i % key.length))
    })
  }

  function b64Encode(data) {
    var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      r,
      i = 0,
      enc = ''
    if (!data) {
      return data
    }

    do {
      o1 = data[i++]
      o2 = data[i++]
      o3 = data[i++]
      bits = (o1 << 16) | (o2 << 8) | o3
      h1 = (bits >> 18) & 0x3f
      h2 = (bits >> 12) & 0x3f
      h3 = (bits >> 6) & 0x3f
      h4 = bits & 0x3f
      enc +=
        b64Table.charAt(h1) +
        b64Table.charAt(h2) +
        b64Table.charAt(h3) +
        b64Table.charAt(h4)
    } while (i < data.length)
    r = data.length % 3
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
  }

  data = xorEncrypt(key, data)
  return b64Encode(data)
}

/**
 * Decrypts a string.
 * @param secret The secret key to decrypt with.
 * @param string The encrypted string to decrypt.
 * @returns A decrypted version of the given string.
 */
export function decrypt(key, data) {
  function b64Decode(data) {
    var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      result = []
    if (!data) {
      return data
    }

    data += ''
    do {
      h1 = b64Table.indexOf(data.charAt(i++))
      h2 = b64Table.indexOf(data.charAt(i++))
      h3 = b64Table.indexOf(data.charAt(i++))
      h4 = b64Table.indexOf(data.charAt(i++))
      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4
      o1 = (bits >> 16) & 0xff
      o2 = (bits >> 8) & 0xff
      o3 = bits & 0xff
      result.push(o1)
      if (h3 !== 64) {
        result.push(o2)
        if (h4 !== 64) {
          result.push(o3)
        }
      }
    } while (i < data.length)
    return result
  }

  function xorDecrypt(key, data) {
    return _.map(data, function (c, i: number) {
      return String.fromCharCode(c ^ key.charCodeAt(Math.floor(i % key.length)))
    }).join('')
  }

  data = b64Decode(data)
  return xorDecrypt(key, data)
}

/**
 * Changes date from SQL to UK format.
 * @param date The date to format (Optional, defaults to 'new Date()').
 * @param seperator The seperator to use (Optional, defaults to '/').
 * @returns string
 */
export const formatDate = (date?: string, seperator?: string) => {
  const sep = seperator ? seperator : '/'
  const dateObj = date ? new Date(date) : new Date()
  const formatDate = `${leadingZero(dateObj.getDate())}${sep}${leadingZero(
    dateObj.getMonth() + 1
  )}${sep}${dateObj.getFullYear()}`
  return formatDate
}

/**
 * Gets current date.
 * @param seperator The seperator to use (Optional, defaults to '-').
 * @returns The current date as string.
 */
export const getDate = (seperator?: string) => {
  const sep = seperator ? seperator : '-'
  const dateObj = new Date()
  const formatDate = `${dateObj.getFullYear()}${sep}${leadingZero(
    dateObj.getMonth() + 1
  )}${sep}${leadingZero(dateObj.getDate())}`
  return formatDate
}

/**
 * Gets the difference in a date to now.
 * @param eventDate The date to compare against.
 * @returns The date difference as an object of numbers.
 */
export const getDateDifference = (eventDate: Date) => {
  const currentDate = new Date()
  const ms = currentDate.getTime() - eventDate.getTime()
  let d: number, h: number, m: number, s: number
  s = Math.floor(ms / 1000)
  m = Math.floor(s / 60)
  s = s % 60
  h = Math.floor(m / 60)
  m = m % 60
  d = Math.floor(h / 24)
  h = h % 24
  return {d, h, m, s}
}

/**
 * Gets current time.
 * @returns The current time as string.
 */
export const getTime = () => {
  const dateObj = new Date()
  const formatTime = `${leadingZero(dateObj.getHours())}:${leadingZero(
    dateObj.getMinutes()
  )}`
  return formatTime
}

/**
 * Gets traffic light color based on percent.
 * @param n1 The base number.
 * @param n2 The number to divide by.
 * @returns A color as string.
 */
export const getTrafficColor = (n1: number | null, n2: number) => {
  let color: string = 'red'
  if (n1 !== null) {
    const percent = n1 / n2
    if (percent >= 0 && percent <= 0.49) {
      color = 'red'
    } else if (percent >= 0.5 && percent <= 0.99) {
      color = 'orange'
    } else {
      color = 'green'
    }
  } else {
    color = 'green'
  }
  return color
}

/**
 * Adds leading zero to number.
 * @param n The number to format.
 * @returns A number with leading zero.
 */
export const leadingZero = (n: number) => (n <= 9 ? parseInt(`0${n}`, 10) : n)

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
    style: 'currency',
  })
