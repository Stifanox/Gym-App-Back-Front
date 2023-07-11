import express from "express"
import { authenticate } from "../middleware/authenticate.js"
import cookieParser from "cookie-parser"
import CycleController from "../actions/user_actions/cycles_actions/CycleController.js"
import TrainingDayController from "../actions/user_actions/cycles_actions/TrainingDayController.js"
import HistoryController from "../actions/user_actions/cycles_actions/HistoryController.js"

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cookieParser())

router.use(authenticate)

router.get("/user",CycleController.requestGetCyclesByUserId.bind(CycleController))

router.get("/:id",CycleController.requestGetCycleById.bind(CycleController))

router.post("/", CycleController.requestAddNewCycle.bind(CycleController))

router.put("/", CycleController.requestEditCycle.bind(CycleController))

router.delete("/:name", CycleController.requestDeleteCycle.bind(CycleController))

router.get("/training-day/:id",TrainingDayController.requestGetTrainingByCycleId.bind(TrainingDayController))

router.post("/training-day",TrainingDayController.requestAddNewTrainingDays.bind(TrainingDayController))

router.put("/training-day",TrainingDayController.requestUpdateTrainingDays.bind(TrainingDayController))

router.delete("/training-day",TrainingDayController.requestDeleteTrainingDays.bind(TrainingDayController))

router.get("/history",HistoryController.requestGetUserHistory.bind(HistoryController))

router.post("/history",HistoryController.requestAddNewHistory.bind(HistoryController))

router.delete("/history/:id",HistoryController.requestDeleteHistory.bind(HistoryController))

export default router
