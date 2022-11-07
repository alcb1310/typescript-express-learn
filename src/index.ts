import express, { Express } from 'express'

import { port } from './environment'
import router from './routes';

const app: Express = express()
app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    
})