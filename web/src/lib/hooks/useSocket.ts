import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  .replace('http://', 'ws://')
  .replace('https://', 'wss://');

const useSocket = () => {
  const [socket, setSocket] = useState(null as Socket | null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketIo = io(url, {
      withCredentials: true,
    });

    const onConnect = () => {
      console.log(`Connected to socket.io at ${url}`);
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log(`Disconnected from socket.io at ${url}`);
      setConnected(false);
    };

    const onReconnect = () => {
      console.log(`Reconnected to socket.io at ${url}`);

      socketIo.once('connect', onConnect);
      socketIo.once('disconnect', onDisconnect);
      socketIo.io.once('reconnect', onReconnect);

      setConnected(true);
    };

    socketIo.once('connect', onConnect);
    socketIo.once('disconnect', onDisconnect);
    // need to access directly the manager https://socket.io/docs/v4/client-socket-instance/#events
    socketIo.io.once('reconnect', onReconnect);

    setSocket(socketIo);

    const cleanup = () => {
      socketIo.offAny();
      socketIo.disconnect();
    };

    return cleanup;
  }, []);

  return { socket, connected };
};

export default useSocket;
