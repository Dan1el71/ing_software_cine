import { config } from 'dotenv'

config({
    path: 'variables.env'
})

export const API_URL = process.env.URL || 'http://localhost:3123'
