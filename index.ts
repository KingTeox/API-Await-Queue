console.log(`[Teox] <process> read index.ts`);
import server from "./src/services/server";

import 'dotenv/config';

try {
    const serverManager = new server();
    console.log(`[Teox] <process> serverManager`);
    serverManager.create();
} catch (error) {
    console.log(`[Teox] <process> ${error}`);
};
