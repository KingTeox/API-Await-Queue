
import fs from "fs";
import path from "path";

class logger {

    path: string;

    constructor() {
        this.path = "../../../src/logs/"
    };

    async log(data: { type: string, ip: string, extra: string, rota: string }) {
        const { type, ip, extra, rota } = data;
        console.log(`[Teox] <Logger> ${type}<${ip}>: ${extra}`);
        return fs.writeFile(path.join(__dirname, this.path + `log-${new Date().getTime()}.txt`), `TYPE: ${type}\nROUTER: ${rota}\nIP: ${ip}\nEXTRA: ${extra}\n\n${new Date()}`, { flag: 'wx' }, (err) => {
            if (err) {
                console.log(`[Teox] <Logger> log ${err}`);
            };
        });
    };

    async dump() {
        const files = fs.readdirSync(path.join(__dirname, this.path));
        console.log(`[Teox] <Logger> dumped files: [${files.length}]`);
        return files;
    };
};

export default logger;
