import express from "express"
import ExerciseControler from "../actions/user_actions/exercise_actions/ExerciseControler.js"
import { authenticate } from "../middleware/authenticate.js"
import cookieParser from "cookie-parser"


const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cookieParser())

router.use(authenticate)

router.get("/",ExerciseControler.requestGetAllExercises.bind(ExerciseControler))

router.get("/:id",ExerciseControler.requestGetExerciseById.bind(ExerciseControler))

router.post("/", ExerciseControler.requestAddNewExercise.bind(ExerciseControler))

export default router