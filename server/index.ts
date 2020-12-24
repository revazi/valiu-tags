import express from 'express'
import * as http from 'http'
import WebSocket from 'ws'
import { decodeMsg, handleMessage, generateRandomHexColor } from '../src/utils/tag'
import { Tag } from '../src/utils/types'

const port = 3080
const server = http.createServer(express())
const wss = new WebSocket.Server({ server })

// Add 100000 tags for testing
let tagsArray: Tag[] = []
for (var i = 0; i < 100000; i++) {
  tagsArray.push({
    id: `${i}`,
    text: `Tag ${i}`,
    color: generateRandomHexColor()
  })
}

let sockets: WebSocket[] = []
wss.on('connection', (ws: WebSocket) => {
  sockets.push(ws)
  ws.send(JSON.stringify({ type: 'INIT', data: tagsArray }))
  ws.on('message', (message) => {
    const msg = decodeMsg(JSON.parse(JSON.parse(JSON.stringify(message))))
    if (msg === undefined || !msg || msg.type === 'INIT') return
    tagsArray = handleMessage(msg, tagsArray)
    sockets.forEach((s: WebSocket) => s.send(JSON.stringify(msg)))
    console.log('\x1b[36m%s\x1b[0m', 'Task received', message)
  })
  ws.on('close', () => {
    sockets = sockets.filter((s: WebSocket) => s !== ws)
  })
  ws.send(JSON.stringify(tagsArray))
})

server.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
