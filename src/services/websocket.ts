import { Server } from "https";
import ws from "ws";

class websocketServer {

    server: Server;

    constructor(server: Server) {
        this.server = server;
    };

    async create() {
        
    };
};

export default websocketServer;
