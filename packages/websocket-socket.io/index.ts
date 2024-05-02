import express from "express";
import {Server} from "socket.io";
import { createServer } from "http";

const app = express();
const port = 3000; 
const server = createServer(app);
const io = new Server(server);



/**
 * ============ HTTP SERVER ============
 */


app.use(express.json()); 


app.get('/', async (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})



/**
 * ============ WEBSOCKET SERVER ============
 */

io.on('connection', (socket) => {
    console.log(`Connected client:${socket.id}\n`);
    socket.on('disconnect', () => {
      console.log(`Disconnected client:${socket.id}\n`);
    });

    socket.emit('data', 'Hello from server');

    socket.on('data', (data) => {
      console.log(`Client data received: ${data}\n`);
    })

    socket.on('conversation', (data) => {
      const {eventType, eventData} = data;
      switch(eventType){
        case 'answer':
          const answer = eventData.answer;
          const clientId = eventData.clientId;
          // Emit to all clients connected to the socket server
          io.emit(`conversation:${eventData.conversationId}`, {
            eventType: 'answer',
            eventData: `client:${clientId} (to all) answered: ${answer}`,
          });

          // Emit to the sender only
          socket.emit(`conversation:${eventData.conversationId}`, {
            eventType: 'answer',
            eventData: `client:${clientId} (only to sender) answered: ${answer}`,
          });
          break;
        default:
          console.log(`Unknown event type: ${eventType}\n`);
      }
    })

});



server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});