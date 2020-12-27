import { isRecord, typeIs, State, ISocketMessage, isState, MessageType } from './types'

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
    case MessageType.UPDATE:
      if (typeof msg.id === 'string' && typeof msg.text === 'string') {
        return typeIs<ISocketMessage>({
          type: MessageType.UPDATE,
          id: msg.id,
          text: msg.text
        })
      }
      return
    case MessageType.CREATE:
      if (typeof msg.text === 'string') {
        return typeIs<ISocketMessage>({ type: MessageType.CREATE, text: msg.text })
      }
      return
    case MessageType.DELETE:
      if (typeof msg.id === 'string') {
        return typeIs<ISocketMessage>({ type: MessageType.DELETE, id: msg.id })
      }
      return
    case MessageType.INIT:
      if (isState(msg.data)) {
        return typeIs<ISocketMessage>({ type: MessageType.INIT, data: msg.data })
      }
      return
  }
}

export const handleMessage = (msg: ISocketMessage, st: State): State => {
  switch (msg.type) {
    case MessageType.UPDATE:
      return st.map((t) => (t.id === msg.id ? { ...t, text: msg.text } : t))
    case MessageType.DELETE:
      return st.filter((t) => t.id !== msg.id)
    case MessageType.CREATE:
      return [
        ...st,
        {
          id: '' + st.length,
          text: msg.text,
          color: generateRandomHexColor()
        }
      ]
    case MessageType.INIT:
      return st
  }
}
