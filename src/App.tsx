import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Tagger } from 'components/Tagger'

const wsUrl = 'ws://localhost:3080'
const App = () => {
  const ws = useRef(new WebSocket(wsUrl))
  const [tags, setTags] = useState([])

  useEffect(() => {
    const startSocketConnection = () => {
      ws.current = new WebSocket(wsUrl)
      ws.current.onopen = () => console.log('ws open')
      ws.current.onmessage = (e: any) => {
        if (e.data) {
          setTags(JSON.parse(e.data))
        }
      }

      ws.current.onclose = () => {
        checkSocketConnection()
      }
    }

    const checkSocketConnection = () => {
      if (!ws.current || ws.current.readyState === WebSocket.CLOSED)
        startSocketConnection()
    }

    startSocketConnection()
    const interval = setInterval(() => {
      checkSocketConnection()
      clearInterval(interval)
    }, 5000)

    return () => {
      ws.current.close()
    }
  }, [])

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
