import { io } from "socket.io-client";
console.log();
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
});

export default socket;
