import 'dotenv/config'
import express, { json } from 'express'
import connect from './setting/mongoose.js'

const app = express()
app.use(json)

connect.then( connected => {
  app.listen(process.env.PORT || 5000, console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`))
} ).catch(() => console.log('Ops você não tem uma conexão com banco...😵😵❌❌'))

