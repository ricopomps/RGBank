import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = process.env.MONGO_URL?.replace('<username>', MONGO_USERNAME).replace('<password>', MONGO_PASSWORD) || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    auth: {
        secret: ACCESS_TOKEN_SECRET
    }
};
