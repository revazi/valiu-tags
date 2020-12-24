export function typeIs<T>(val: T): T {
  return val
}
export const isRecord = (msg: unknown): msg is Record<string, unknown> => {
  return typeof msg === 'object' && msg !== null && !Array.isArray(msg)
}

export interface Tag {
  id: string
  text: string
  color: string
}
export type State = Array<Tag>

export const isState = (data: unknown): data is State => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.color === 'string'
    )
  )
}

export type ISocketMessage =
  | { type: 'UPDATE'; id: string; text: string }
  | { type: 'CREATE'; text: string }
  | { type: 'DELETE'; id: string }
  | { type: 'INIT'; data: State }
