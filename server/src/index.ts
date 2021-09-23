import express from 'express'
import cors from 'cors'
import {notesRouter} from './notesController'
import { connectDatabase } from './database'
let app = express()

function start() {
    app.listen(5000, () => {
        console.log("Server iniciado en puerto 5000")
    })
}

function config() {

    app.use(cors())
    app.use(express.json())
    app.use("/api/notes",notesRouter)
  

}

start()
config()
connectDatabase()