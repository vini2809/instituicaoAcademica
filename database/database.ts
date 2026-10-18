import Knex from 'knex'
import dotenv from 'dotenv'
import knexStringcase from 'knex-stringcase'; 
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env') })

function requiredEnv(name: string): string {
    const value = process.env[name]

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

export const database = Knex({
    client: requiredEnv('DB_CLIENT'),
    connection: {
        host: requiredEnv('DB_HOST'),
        database: requiredEnv('DB_DATABASE'),
        user: requiredEnv('DB_USER'),
        password: requiredEnv('DB_PASSWORD'),
    },
    ...knexStringcase()
});