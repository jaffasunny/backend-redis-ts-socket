import { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

export const setupSocket = (httpServer: HttpServer, app: Express) => {
  const io = new Server(httpServer, {
    cors: {
      // frontend url
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  app.set('io', io); // Attach io to the app instance

  //   whenever user connects to our server will get a unique socket id
  io.on('connection', (socket) => {
    console.log(`User connected to socket.io: ${socket.id}`);
    const userId = socket.handshake.query.userId;

    if (userId) {
      socket.join(userId);
    }

    socket.on('setup', (userData) => {
      console.log(`User ${userData._id} Connected, socket.io: ${socket.id}`);
      socket.join(userData._id);
      socket.emit(`User ${userData._id} Connected, socket.io: ${socket.id}`);
    });

    socket.on('join chat', (room) => {
      socket.join(room);
      console.log('User Joined Room:', room);
    });

    socket.on('leave chat', (room) => {
      socket.leave(room);
      console.log('User Left Room:', room);
    });

    // message event listener
    socket.on('message', (data) => {
      console.log(`Message from ${socket.id} ${data}`);

      //   broadcast all the message
      io.emit('message', data);
    });

    // Handle Disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
