import 'dotenv/config'

/* cors */
import cors from 'cors'

/* express */
import express, { json } from 'express'

/* mongodb connect */
import connect from './setting/mongoose.js'

/* server */
const app = express()
app.use(json())
app.use(cors())

/* start app */
connect.then( connected => {
  app.listen(process.env.PORT || 5000, console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`))
} ).catch(() => console.log('Ops você não tem uma conexão com banco...😵😵❌❌'))

