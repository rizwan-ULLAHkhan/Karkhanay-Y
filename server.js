import { createServer } from 'http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import {Message} from './models/messageModel.js'; // Import your Message model
import mongoose from 'mongoose';
import cors from 'cors';


const nextPort = parseInt(process.env.NEXT_PUBLIC_PORT, 10) || 3000;
const socketIOPort = parseInt(process.env.SOCKET_IO_PORT, 10) || 3001;
const ObjectId = mongoose.Types.ObjectId;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// Configure CORS
const corsMiddleware = cors({
  // Configure your CORS options here
  origin: ["http://localhost:3000"], // Adjust based on your needs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});


mongoose.connect("mongodb+srv://karkhanay:Poineer1313@cluster0.s22s1nk.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Karkhanay' })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Next.js server
app.prepare().then(() => {
  const nextServer = createServer((req, res) => {
    // Apply CORS middleware
    corsMiddleware(req, res, () => {
      // Handle Next.js page requests
      handle(req, res);
    });
  });

  nextServer.listen(nextPort, () => {
    console.log(`> Next.js Ready on http://localhost:${nextPort}`);
  });
});


// WebSocket server with Socket.io
const socketIOServer = createServer();
const io = new SocketIOServer(socketIOServer, {
  cors: {
    origin: ["http://localhost:3000"], // or "*" to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  // Handle the 'chat message' event
  socket.on('chat message', async (data) => {
    console.log(data,"this is data")
    try {
      console.log("beecee")
      // Save the message to the database
      const newMessage = await Message.create({
        conversationId: new mongoose.Types.ObjectId(data.conversationId),
        sender: new mongoose.Types.ObjectId(data.sender),
        receiver: new mongoose.Types.ObjectId(data.receiver),
        messageText: data.message,
      });
      
      console.log("beecee")
      // Emit the message to all clients in the conversation
      io.to(data.conversationId).emit('chat message', newMessage);

      console.log("bhosdri")
    } catch (error) {
      console.error('Error saving message:', error.message, error.stack);
    }
  });

  // Handle joining a conversation room
  socket.on('join conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(io.sockets.adapter.rooms.get(conversationId));

  });

  // Handle leaving a conversation room
  socket.on('leave conversation', (conversationId) => {
    socket.leave(conversationId);
    console.log(io.sockets.adapter.rooms.get(conversationId));

  });
});

socketIOServer.listen(socketIOPort, () => {
  console.log(`> Socket.io Ready on http://localhost:${socketIOPort}`);
});