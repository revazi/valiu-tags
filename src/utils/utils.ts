export function typeIs<T>(val: T): T {
  return val
}
export const isRecord = (msg: unknown): msg is Record<string, unknown> => {
  return typeof msg === 'object' && msg !== null && !Array.isArray(msg)
}
