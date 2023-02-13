import express from "express";
import ClientRouter from "./routes/client.routes.js"
import ExerciseRouter from "./routes/exercise.routes.js"
import CyclesRouter from "./routes/cycles.routes.js"
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";


const app = express()

//FIXME: naprawić aby później poprawie czytało (teraz trzeba kombinować ze ścieżką)
//It's done to fix problem with reading .env file
const filename = fileURLToPath(import.meta.url)
dotenv.config({path:path.join(path.dirname(filename),"../src/.env")})


app.use("/users", ClientRouter)

app.use("/exercises",ExerciseRouter)

app.use("/cycles",CyclesRouter)

app.listen(3000, ()=>{
    console.log("Server start");
})