import { createServer } from "http";
import WebSocket from "ws";
import { readFileSync } from "fs";
import { resolve } from "path";


const PORT = 3000;

/**
 * ============ HTTP SERVER ============
 */

const server = createServer((req, res) => {
  if (req.url === '/') {
    const data = readFileSync(resolve(__dirname, './index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`http (http://) server started on port:${PORT}`)
});

/**
 * ============ WEBSOCKET SERVER ============
 */

const wss = new WebSocket.Server({ server });

console.log(`websocket (ws://) server started on port:${PORT}`)


wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('message', (message) => {
      console.log(message.toString());
      // Send message to sender client only
      ws.send("send to only sender client");

      // Send message to every client connected
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("send to all client");
        }
      });
    });

    ws.send('Hello from server');
});

