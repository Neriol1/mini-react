export const isTextNode = node => {
  return typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean'
}
