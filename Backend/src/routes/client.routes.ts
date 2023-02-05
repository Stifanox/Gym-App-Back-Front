import express from "express"
import { PostgresDBController } from "../database/PostgresDBController.js";
import { SendError } from "../responses/SendError.js";
import { SendSuccess } from "../responses/SendSuccess.js";
import { RegisterUserController } from "../actions/user_actions/RegisterUser.js";
import { LoginUser } from "../actions/user_actions/LoginUser.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
//TODO: zrobić gateway do bazy danych (dla każedego ...User zrobić osobny gateway)
//TODO: zrobić z tego globala 
//TODO: zmienić to z controler na adapter
const controller = new PostgresDBController()
//TODO: Wywołać metode z controllera
router.post("/register",async (req,res)=>{
    const {
        password,
        username,
        email
    } = req.body

    const registerAction = new RegisterUserController(controller)
    const result = await registerAction.registerUser(username,password,email)
    res.status(200);
    if(result) res.end(new SendSuccess("Register was successful").stringify())
    else res.end(new SendError("User already exist").stringify())
})

router.post("/login", async (req,res)=>{
    const {
        username,
        password
    } = req.body

    const loginAction = new LoginUser(controller);
    const result = await loginAction.loginUser(username,password);
    res.status(200)
    if(result) res.end(new SendSuccess("This is token for user").stringify())
    else res.end(new SendError("Wrong password or username").stringify())
})

export default router