
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT 

const dbHost = process.env.DATABASE_HOST
const dbPort = Number(process.env.DATABASE_PORT)
const dbUsername = process.env.DATABASE_USERNAME
const dbPassword = process.env.DATABASE_PASSWORD
const dbDatabase = process.env.DATABASE_NAME

export { port, dbDatabase, dbHost, dbPassword, dbPort, dbUsername }