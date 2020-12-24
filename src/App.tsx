import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Tagger } from 'components/Tagger'
import { decodeMsg, handleMessage } from 'utils/tag'
import { State } from 'utils/types'

const wsUrl = 'ws://localhost:3080'
const App = () => {
  const ws = useRef(new WebSocket(wsUrl))
  const [tags, setTags] = useState<State>([])

  const checkSocketConnection = useCallback(() => {
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED)
      startSocketConnection()
  }, [ws])

  const startSocketConnection = useCallback(() => {
    ws.current = new WebSocket(wsUrl)
    ws.current.onopen = () => {
      console.log('connection opened')
    }
    ws.current.onmessage = (message: any) => {
      if (message.data) {
        const msg = decodeMsg(JSON.parse(message.data))
        if(msg !== undefined || msg) {
          if(msg.type === 'INIT') {
            setTags(handleMessage(msg, msg.data))
          } else {
            setTags((tags) => handleMessage(msg, tags))
          }
        }
      }
    }
    ws.current.onclose = () => {
      checkSocketConnection()
    }
  }, [setTags, checkSocketConnection])


  useEffect(() => {
    startSocketConnection()
    const interval = setInterval(() => {
      checkSocketConnection()
      clearInterval(interval)
    }, 5000)

    return () => {
      ws.current.close()
    }
  }, [checkSocketConnection, startSocketConnection])

  const onEdit = useCallback((tId: string, text: string) => {
    ws.current.send(
      JSON.stringify({
        type: 'UPDATE',
        id: tId,
        text: text
      })
    )
  }, [])

  const onCreate = useCallback((text: string) => {
    ws.current.send(
      JSON.stringify({
        type: 'CREATE',
        text: text
      })
    )
  }, [])

  const onDelete = useCallback((tId: string) => {
    ws.current.send(
      JSON.stringify({
        type: 'DELETE',
        id: tId
      })
    )
  }, [])

  return (
    <Tagger
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      tags={tags}
      collapsed={false}
    />
  )
}

export default App
