const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'

export function generateShortCode(length = 6): string {
  let result = ''

  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * ALPHABET.length)
    result += ALPHABET[index]
  }

  return result
}