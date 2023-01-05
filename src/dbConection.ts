import mysql from "mysql2"
import {createClient} from "redis"
import Redis from "ioredis"
let client_ioredis = new Redis()
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Praveen@8919296298",
  port: 3306,
  database: "ecommerse",
})
connection.connect((err) => {
  err ? console.log(err) : console.log("Connected to mysql db")
})

let client = createClient()

client.on("error", (err) => {
  console.log("Failed to connec the redus server", err)
  client.disconnect()
  throw new Error("Failed to connect to the redis server please try again")
})

client.connect().then(() => {
  
  console.log("Redis server is connected")
})

client_ioredis.on("error",(err)=>{
  console.log(err)
  client_ioredis.disconnect()
  throw new Error("Failed to connect to the redis server")

})

let pipeline = client_ioredis.pipeline()

export { connection, client, pipeline }
