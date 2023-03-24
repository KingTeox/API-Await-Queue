
import express from "express";
import helmet from "helmet";

import path from "path";
import http from "http";

import routers from "../routers/index";

import logger from "./logs";
import queue from "./queue";
import websocket from "./websocket";

class server {

    app: express.Application;
    routers: express.Router;

    constructor() {
        this.app = express();
        this.routers = routers;
    };

    async create() {

        console.log(`[Teox] <server> Started.`);

        this.app.use(helmet());
        console.log(`[Teox] <server> helmet Loaded.`);
        this.app.use(express.static(path.join(__dirname, "../../../public/")));
        console.log(`[Teox] <server> static Loaded.`);
        this.app.use("/", this.routers);
        console.log(`[Teox] <server> routers Loaded.`);

        const serverHttp = http.createServer(this.app);
        const serverWs   = new websocket(serverHttp);

        serverHttp.listen(5443, async () => {
            console.log(`[Teox] <server> listening`);
            new queue(await serverWs.create());
        });
    };
};

export default server;
