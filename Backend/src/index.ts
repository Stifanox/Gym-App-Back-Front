import express from "express";
import ClientRouter from "./routes/client.routes.js"
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";


const app = express()

//FIXME: naprawić aby nie było problemu z dotenv
//It's done to fix problem with reading .env file
const filename = fileURLToPath(import.meta.url)
const config = dotenv.config({path:path.join(path.dirname(filename),"../src/.env")})


app.use("/user", ClientRouter)



app.listen(3000, ()=>{
    console.log("Server start");
})
