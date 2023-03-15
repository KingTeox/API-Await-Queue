console.log(`[Teox] <process> read index.ts`);
import server from "./src/services/server";

try {
    const serverManager = new server();
    console.log(`[Teox] <process> serverManager`);
    serverManager.create();
} catch (error) {
    console.log(`[Teox] <process> ${error}`);
};
