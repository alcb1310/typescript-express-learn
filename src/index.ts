import express, { Express, Request, Response } from 'express'

import { Photo } from './models/photo-entity'
import { AppDataSource } from './db'
import { port } from './environment'


const app: Express = express()


app.get('/', async(req: Request, res: Response) => {
    await saveData()
    res.send('Express + Typescript Server is running')
})

const saveData = async () => {
    const photo = new Photo()
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

    await AppDataSource.manager.save(photo)
}





app.listen(5050, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    
})