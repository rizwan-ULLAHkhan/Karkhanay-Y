import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();


app.prepare().then(() => {
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  
    const io = socketIo(server);
  
    io.on('connection', (socket) => {
      // Handle socket events
      socket.on('message', (data) => {
        // Broadcast the message to all sockets
        io.emit('message', data);
      });
  
      socket.on('disconnect', () => {
        // Handle disconnect
      });
    });
  
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  });
