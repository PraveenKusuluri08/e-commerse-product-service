import path from 'path'
import dotenv  from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../server.env")})

export const dbConfig={
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    PORT: Number(process.env.DB_PORT),
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

