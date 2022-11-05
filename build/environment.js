"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUsername = exports.dbPort = exports.dbPassword = exports.dbHost = exports.dbDatabase = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
exports.port = port;
const dbHost = process.env.DATABASE_HOST;
exports.dbHost = dbHost;
const dbPort = Number(process.env.DATABASE_PORT);
exports.dbPort = dbPort;
const dbUsername = process.env.DATABASE_USERNAME;
exports.dbUsername = dbUsername;
const dbPassword = process.env.DATABASE_PASSWORD;
exports.dbPassword = dbPassword;
const dbDatabase = process.env.DATABASE_NAME;
exports.dbDatabase = dbDatabase;
