import express from "express"
import { authenticate } from "../middleware/authenticate.js"
import cookieParser from "cookie-parser"
import CycleController from "../actions/user_actions/cycles_routes/CycleController.js"

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cookieParser())

router.use(authenticate)

router.get("/:id",CycleController.requestGetCycleById.bind(CycleController))

router.post("/", CycleController.requestAddNewCycle.bind(CycleController))

router.put("/", CycleController.requestEditCycle.bind(CycleController))

router.get("/user/:id",CycleController.requestGetCyclesByUSerId.bind(CycleController))

router.post("/training-day")

router.put("/training-day")


//cycle by id

//cycles by user id

//add cycle

//add training day to cycle

//edit cycle

// edit training day

