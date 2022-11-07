import { Photo } from './../models/photo-entity';
import { PhotoMetadata } from '../models/photo-metadata-entity';
import { DataSource } from "typeorm";

import { dbDatabase, dbHost, dbPassword, dbPort, dbUsername } from '../environment'
import { Author } from '../models/author-entity';


// console.log(typeof process.env.DATABASE_PASSWORD);


const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: Number(dbPort),
    username: dbUsername,
    password: dbPassword,
    database: dbDatabase,
    entities:[
        Photo,
        PhotoMetadata,
        Author
    ],
    synchronize: true, 
    logging: false
})

AppDataSource.initialize().then(() => {
    console.log('Database initialized');
    
}).catch(error => console.log(error))

export {AppDataSource}