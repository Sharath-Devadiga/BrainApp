import dotenv from 'dotenv'
dotenv.config()
import express from 'express' 
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { userRouter } from './routes/user'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/v1/user',userRouter)

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('connected to db')
        app.listen(3000, () => {
            console.log('server')
        })
    } catch (err) {
        console.log('error while conneting to db', err)
    }
}

main()