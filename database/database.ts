import Knex from 'knex'
import knexStringcase from 'knex-stringcase'; 
import dotenv from 'dotenv'
dotenv.config()

export const database = Knex({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    ...knexStringcase()
});