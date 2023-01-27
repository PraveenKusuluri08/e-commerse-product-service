import mysql from "mysql2"
import * as redis from "redis"
import Redis from "ioredis"
import {dbConfig} from "./dbConfig"
let client_ioredis = new Redis()


let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: dbConfig.PORT,
  database:dbConfig.DB,
})
connection.connect((err) => {
  err ? console.log(err) : console.log("Connected to mysql db")
})

const client = redis.createClient({
  url: 'redis://redis:6379'
  });
client.on("error", (err) => {
  console.log("Failed to connec the redus server", err)
  client.disconnect()
  throw new Error("Failed to connect to the redis server please try again")
})

client.connect().then(() => {
  
  console.log("Redis server is connected")
})

client.on("error",(err)=>{
  console.log(err)
  client_ioredis.disconnect()
  client.disconnect()
  throw new Error("Failed to connect to the redis server")

})

let pipeline = client_ioredis.pipeline()

export { connection, client, pipeline }
