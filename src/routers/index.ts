
import { Router } from "express";

import logger from "../services/logs";

const loggerManager = new logger();
const routersManager = Router();

routersManager.use((req, res, next) => {
    //console.log(req.headers);
    loggerManager.log({ type: "HTTP", ip: req.headers["x-real-ip"]?.toString() || "Local", extra: `headers: ${req.rawHeaders.length}`, rota: req.originalUrl })
    next();
});

routersManager.all("/", async (req, res) => {
    return res.json({
        server: "OK"
    });
});

routersManager.use((req, res) => {
    return res.json({ 
        message: "Router or File not found."
    });
});

export default routersManager
