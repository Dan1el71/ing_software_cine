import { config } from 'dotenv'

config()

export const API_URL = process.env.URL || 'http://localhost:3123'
