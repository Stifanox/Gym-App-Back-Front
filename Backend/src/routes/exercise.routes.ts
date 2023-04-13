import express from "express"
import ExerciseControler from "../actions/user_actions/exercise_actions/ExerciseControler.js"
import { authenticate } from "../middleware/authenticate.js"
import cookieParser from "cookie-parser"


const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cookieParser())


router.get("/",ExerciseControler.requestGetAllExercises.bind(ExerciseControler))

router.get("/:id",ExerciseControler.requestGetExerciseById.bind(ExerciseControler))

router.post("/", authenticate, ExerciseControler.requestAddNewExercise.bind(ExerciseControler))

router.delete("/:id",authenticate, ExerciseControler.requestDeleteExerciseById.bind(ExerciseControler))

export default router