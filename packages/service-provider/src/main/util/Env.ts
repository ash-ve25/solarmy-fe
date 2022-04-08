import * as dotenv from 'dotenv'
import * as fs from 'fs';

const parsedDotEnv = fs.existsSync('.env') ? dotenv.parse(fs.readFileSync('.env')) : {};

const envConfig = {
    ...process.env,
    ...parsedDotEnv
};

export class Env {

    static get<T>(key: string, def: any = null): T {
        return envConfig[key] || def;
    }

    static getAsInt(key: string, def: any = 0): number {
        // @ts-ignore
        return parseInt((envConfig[key] || def));
    }
}
