import express from "express"
import RegisterUserController from "../actions/user_actions/RegisterUserController.js";
import LoginUserController  from "../actions/user_actions/LoginUserController.js";




const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.post("/register",RegisterUserController.requestRegisterUser.bind(RegisterUserController))

router.post("/login", LoginUserController.requestLoginUser.bind(LoginUserController) )

export default router