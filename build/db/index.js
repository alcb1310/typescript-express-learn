"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const photo_entity_1 = require("./../models/photo-entity");
const typeorm_1 = require("typeorm");
const environment_1 = require("../environment");
// console.log(typeof process.env.DATABASE_PASSWORD);
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: environment_1.dbHost,
    port: Number(environment_1.dbPort),
    username: environment_1.dbUsername,
    password: environment_1.dbPassword,
    database: environment_1.dbDatabase,
    entities: [
        photo_entity_1.Photo
    ],
    synchronize: true,
    logging: false
});
exports.AppDataSource = AppDataSource;
AppDataSource.initialize().then(() => {
    console.log('Database initialized');
}).catch(error => console.log(error));
