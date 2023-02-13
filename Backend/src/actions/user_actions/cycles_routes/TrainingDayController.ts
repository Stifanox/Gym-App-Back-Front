import { Request, Response } from "express";
import PostgresDBController from "../../../database/PostgresDBController.js";
import { TrainingDayGateway } from "../../../gateways/cycle_gateways/TrainingDayGateway.js";
import { SendError } from "../../../responses/SendError.js";
import { SendSuccess } from "../../../responses/SendSuccess.js";
import { TrainingDay, TrainingDayWithId } from "./TrainingDay.js";

class TrainingDayController{
    private gateway:TrainingDayGateway

    constructor(){
        this.gateway = new TrainingDayGateway(PostgresDBController)
    }

    requestAddNewTrainingDays(req:Request,res:Response){
        const trainingDays:TrainingDay[] = JSON.parse(req.body.trainingDays)

        //FIXME: Później sprawdzać jakoś czy jest dobrze to handlowane
        trainingDays.forEach(training => {
            this.gateway.addNewTrainingDay(training)
        });

        res.status(200)
        res.end(new SendSuccess("Training days were added successful").stringify())
    }

    async requestUpdateTrainingDays(req:Request,res:Response){
        const trainingDays:TrainingDayWithId[] = JSON.parse(req.body.trainingDays)

        trainingDays.forEach(training =>{
            this.gateway.editTrainingDay(training)
        })

        res.status(200)
        res.end(new SendSuccess("Change training day").stringify())
    }

    async requestDeleteTrainingDays(req:Request,res:Response){
        const trainingIds:number[] = JSON.parse(req.body.trainingDays)

        trainingIds.forEach(id =>{
            this.gateway.deleteTrainingDay(id)
        })

        res.status(200)
        res.end(new SendSuccess("Trainings were delete successful").stringify());
    }

    async requestGetTrainingByCycleId(req:Request,res:Response){
        const id = parseInt(req.params.id)

        const result = await this.gateway.getTrainingByCycleId(id)

        res.status(200)
        res.end(new SendSuccess(result).stringify())
    }
}

export default new TrainingDayController()