import http from 'http';
import express, { Express } from 'express';
import { Server } from 'socket.io';
import { logger } from '../logging';
import join from './join';
import sendMessage from './sendMessage';

export default (app: Express, sessionMiddleware: express.RequestHandler): http.Server => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const req = socket.request as express.Request;
    const res = req.res as express.Response;
    sessionMiddleware(req, res, next as express.NextFunction);
  });

  io.on('connection', function (socket) {
    const req = socket.request as express.Request;
    logger.info(`User with id '${req.session.userId}' connected to socket.`);

    socket.on('join', join(io, socket, req.session.userId));
    socket.on('sendMessage', sendMessage(io, socket, req.session.userId));
  });

  return server;
};
