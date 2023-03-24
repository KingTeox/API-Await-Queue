import { Server } from "http";
import ws from "ws";

class websocketServer {

    server: Server;

    constructor(server: Server) {
        this.server = server;
    };

    async create() {
        console.log(`[Teox] <ws> Started.`);
        return new ws.Server({ server: this.server });
    };
};

export default websocketServer;
