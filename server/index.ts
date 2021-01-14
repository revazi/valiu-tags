import express, { Request, Response } from 'express'
import * as http from 'http'
import WebSocket from 'ws'
import { decodeMsg, handleMessage, generateRandomHexColor } from '../src/utils/tag'
import { Tag, MessageType } from '../src/utils/types'

const port = 3080
const app = express()

// Add 10 tags for testing
let tagsArray: Tag[] = []
for (var i = 0; i < 10; i++) {
  tagsArray.push({
    id: `${i}`,
    text: `Tag ${i}`,
    color: generateRandomHexColor()
  })
}

app.get('/tags', (req: Request, res: Response) => {
  let page = 1
  let limit = 20
  if ('page' in req.query && typeof req.query.page === 'string') {
    page = parseInt(req.query.page)
  }
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  res.status(200).send(JSON.stringify(tagsArray.slice(startIndex, endIndex)))
})

app.post('/tags', (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify({ updated: 'huh' }))
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let sockets: WebSocket[] = []
wss.on('connection', (ws: WebSocket) => {
  sockets.push(ws)
  ws.send(JSON.stringify({ type: MessageType.INIT, data: tagsArray }))
  ws.on('message', (message) => {
    const msg = decodeMsg(JSON.parse(JSON.parse(JSON.stringify(message))))
    if (msg === undefined || !msg || msg.type === MessageType.INIT) return
    tagsArray = handleMessage(msg, tagsArray)
    sockets.forEach((s: WebSocket) => s.send(JSON.stringify(msg)))
    console.log('\x1b[36m%s\x1b[0m', 'Task received', message)
  })
  ws.on('close', () => {
    sockets = sockets.filter((s: WebSocket) => s !== ws)
  })
})

server.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
