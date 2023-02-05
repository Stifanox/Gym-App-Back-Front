import express from "express";
import ClientRouter from "./routes/client.routes.js"

const app = express()

app.use("/user", ClientRouter)

app.listen(3000, ()=>{
    console.log("Server start");
})