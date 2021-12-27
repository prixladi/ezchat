import { useEffect, useState } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  .replace('http://', 'ws://')
  .replace('https://', 'wss://');

export default () => {
  const [socket, setSocket] = useState(null as Socket | null);

  useEffect(() => {
    const options: Partial<ManagerOptions & SocketOptions> = {
      withCredentials: true,
    };

    const socketIo = io(url, options);
    setSocket(socketIo);

    const cleanup = () => {
      socketIo.disconnect();
    };

    return cleanup;
  }, []);

  return { socket };
};
