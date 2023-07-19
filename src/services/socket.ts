import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io(import.meta.env.VITE_APP_BE);

socket.on('error', ({ type, message }: { type: 'info' | 'error'; message: string }) => {
  toast[type](message);
});

export default socket;
