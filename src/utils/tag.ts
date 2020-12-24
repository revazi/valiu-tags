import { isRecord, typeIs, State, ISocketMessage, isState } from './types'

export const generateRandomHexColor = () => {
  const hexCode = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * 16)]
  }
  return color
}

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
    case 'INIT':
      if (isState(msg.data)) {
        return typeIs<ISocketMessage>({ type: 'INIT', data: msg.data })
      }
      return
  }
}

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
    case 'INIT':
      return st
  }
}
