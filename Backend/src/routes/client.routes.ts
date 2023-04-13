import express from "express"
import RegisterUserController from "../actions/user_actions/client_actions/RegisterUserController.js";
import cookieParser from 'cookie-parser'
import LoginUserController from "../actions/user_actions/client_actions/LoginUserController.js";
import IdUserController from "../actions/user_actions/client_actions/IdUserController.js";



const router = express.Router();

router.use(cookieParser())
router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.post("/register",RegisterUserController.requestRegisterUser.bind(RegisterUserController))

router.post("/login", LoginUserController.requestLoginUser.bind(LoginUserController))

router.get("/get-id",IdUserController.requestGetUserId.bind(IdUserController))


export default router