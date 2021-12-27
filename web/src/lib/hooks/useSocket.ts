import { useEffect, useState } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  .replace('http://', 'ws://')
  .replace('https://', 'wss://');

const useSocket = () => {
  const [socket, setSocket] = useState(null as Socket | null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const options: Partial<ManagerOptions & SocketOptions> = {
      withCredentials: true,
    };

    const socketIo = io(url, options);
    socketIo.once('connect', () => setConnected(true));
    socketIo.once('disconnect', () => setConnected(false));
    // need to access directly the manager https://socket.io/docs/v4/client-socket-instance/#events
    socketIo.io.once('reconnect', () => setConnected(true));

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
