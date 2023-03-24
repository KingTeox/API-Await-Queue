
import { IncomingMessage } from "http";
import { Server, WebSocket } from "ws";
import logger from "./logs";

const fila = new Map();

class queue {

    server: Server<WebSocket>;
    position: number;
    next: Array<{ socket: WebSocket, request: IncomingMessage }>;
    logs: logger;
    
    constructor(server: Server<WebSocket>) {
        this.server     = server;
        this.position   = 0;
        this.next       = [];
        this.logs       = new logger();
        this.listeners();
    };

    async autoRemove() {
        console.log(`[Teox] <queue> autoRemove Started.`);
        setInterval(() => {
            if (this.position === 0)        { return; };
            if (this.next.length === 0)     { return; };
            this.next[0].socket.close(1000, JSON.stringify({ message: "Chegou sua vez." }));
            this.position--; 
            console.log(`[Teox] <queue> autoRemove ${this.next[0].request.headers["x-real-ip"]?.toString() || "Local"}`);
        }, 5000);
    };

    async listeners() {
        
        console.log(`[Teox] <queue> started Listeners.`);
    
        this.autoRemove();

        this.server.on("connection", (socket, request) => {
            
            const realIP = request.headers["x-real-ip"]?.toString() || "Local";
            const url = request.url || "Rota Invalida";

            this.position++;

            console.log(`[Teox] <queue> new Connection from ${realIP}`);

            socket.on("close", (code, reason) => {
                let msg = reason.toString("utf-8");
                console.log(`[Teox] <${realIP}> ${code} - ${JSON.parse(msg).message}`);
            });

            this.logs.log({ type: "WS", ip: realIP, extra: socket.protocol, rota: url });
            this.next.push({ socket, request });
        });

        this.server.on("error", (error) => {
            console.log(`[Teox] <queue> ${error}.`);
        });

        this.server.on("listening", () => {
            console.log(`[Teox] <queue> ws Listening.`);
        });

    };

    async consultar(ip: string) {

    };
};

export { fila };
export default queue;
