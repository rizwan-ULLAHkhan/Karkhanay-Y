import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import MessageModel from './models/messageModel'; // Import your Message model

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log("inside socket server ")
app.prepare().then(() => {
  const server = createServer(handle);
  const io = new Server(server);

  io.on('connection', (socket) => {
    // Handle the 'chat message' event
    socket.on('chat message', async (data) => {
      try {
        // Save the message to the database
        const newMessage = await create({
          conversationId: data.conversationId,
          sender: data.sender,
          receiver: data.receiver,
          messageText: data.message,
        });

        // Emit the message to all clients in the conversation
        io.to(data.conversationId).emit('chat message', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Handle joining a conversation room
    socket.on('join conversation', (conversationId) => {
      socket.join(conversationId);
    });

    // Handle leaving a conversation room
    socket.on('leave conversation', (conversationId) => {
      socket.leave(conversationId);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
