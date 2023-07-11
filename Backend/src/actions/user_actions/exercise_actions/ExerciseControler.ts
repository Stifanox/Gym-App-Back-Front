import { Request, Response } from "express";
import PostgresDBController from "../../../database/PostgresDBController.js";
import { ExerciseGateway } from "../../../gateways/exercise_gateways/ExerciseGateway.js";
import { SendError } from "../../../responses/SendError.js";
import { SendSuccess } from "../../../responses/SendSuccess.js";

class ExerciseController{
    private gateway:ExerciseGateway

    constructor(){
        this.gateway = new ExerciseGateway(PostgresDBController)
    }

    async requestGetAllExercises(req:Request,res:Response){
        const result = await this.gateway.getAllExercises()

        res.status(200)
        res.contentType("application/json")
        res.end(new SendSuccess(result).stringify())
    }

    async requestGetExerciseById(req:Request,res:Response){
        const id = parseInt(req.params.id)
        const result = await this.gateway.getExerciseById(id)

        res.status(200)
        res.end(new SendSuccess(result).stringify())
    }

    async requestAddNewExercise(req:Request,res:Response){
        const {name,type} = req.body

        const result = await this.gateway.addNewExercise(name,type)

        if(result){
            res.status(200)
            res.end(new SendSuccess("Exercise was added").stringify())
        }else{
            res.status(200)
            res.end(new SendError("Adding exercise was not successful").stringify())
        }
    }

    async requestDeleteExerciseById(req:Request,res:Response){
        const id = parseInt(req.params.id)
        const result = await this.gateway.deleteExerciseById(id)

        if(result){
            res.status(200)
            res.end(new SendSuccess("Exercise deleted").stringify())
        }else{
            res.status(200)
            res.end(new SendError("Couldn't delete exercise").stringify())
        }
    }
}

export default new ExerciseController()