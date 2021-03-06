import io from "socket.io-client";

export class Socket {
  socket: any;
  constructor() {
    const item = window.localStorage.getItem("accessToken");
    const jwt = item ? JSON.parse(item) : "";
    this.socket = io(
      process.env.REACT_APP_SOCKET_URL ||
        process.env.REACT_APP_API_URL ||
        "localhost:3020",
      {
        transports: ["websocket"],
        query: {
          token: jwt,
        },
      }
    );
    console.log(`this.socket`, this.socket);
  }
}
