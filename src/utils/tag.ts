import { isRecord, typeIs } from './utils'

export const generateRandomHexColor = () => {
  const hexCode = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * 16)]
  }
  return color
}

export type ISocketMessage =
  | { type: 'UPDATE'; id: string; text: string }
  | { type: 'CREATE'; text: string }
  | { type: 'DELETE'; id: string }

export const decodeMsg = (msg: unknown): void | ISocketMessage => {
  if (!isRecord(msg)) return
  switch (msg.type) {
    case 'UPDATE':
      if (typeof msg.id === 'string' && typeof msg.text === 'string') {
        return typeIs<ISocketMessage>({
          type: 'UPDATE',
          id: msg.id,
          text: msg.text
        })
      }
      return
    case 'CREATE':
      if (typeof msg.text === 'string') {
        return typeIs<ISocketMessage>({ type: 'CREATE', text: msg.text })
      }
      return
    case 'DELETE':
      if (typeof msg.id === 'string') {
        return typeIs<ISocketMessage>({ type: 'DELETE', id: msg.id })
      }
      return
  }
}

export interface Tag {
  id: string
  text: string
  color: string
}

export type State = Array<Tag>
export const handleMessage = (msg: ISocketMessage, st: State): State => {
  switch (msg.type) {
    case 'UPDATE':
      return st.map((t) => (t.id === msg.id ? { ...t, text: msg.text } : t))
    case 'DELETE':
      return st.filter((t) => t.id !== msg.id)
    case 'CREATE':
      return [
        ...st,
        {
          id: '' + st.length,
          text: msg.text,
          color: generateRandomHexColor()
        }
      ]
  }
}
