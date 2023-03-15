
import { Router } from "express";

import logger from "../services/logs";

const loggerManager = new logger();
const routersManager = Router();

routersManager.use((req, res, next) => {
    loggerManager.log({ type: "HTTP", ip: req.headers["X-Real-IP"]?.toString() || "Local", extra: `headers: ${req.rawHeaders.length}` })
    next();
});

routersManager.use("/", async (req, res) => {
    return res.json({
        server: "OK"
    });
});

export default routersManager
