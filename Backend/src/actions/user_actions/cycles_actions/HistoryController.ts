import { Request, Response } from "express"
import PostgresDBController from "../../../database/PostgresDBController.js"
import { HistoryGateway } from "../../../gateways/cycle_gateways/HistoryGateway.js"
import { SendSuccess } from "../../../responses/SendSuccess.js"
import { verifyWebToken } from "../../../utils/user_utils/functions/WebtokenUtils.js"
import { TrainingDay } from "./interfaces/TrainingDay.js"

class HistoryController{

    private gateway:HistoryGateway

    constructor() {
        this.gateway = new HistoryGateway(PostgresDBController)
    }

    async requestGetUserHistory(req:Request,res:Response){
        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)

        const result = await this.gateway.getUserHistoryById(user["id"]);

        res.status(200);
        res.end(new SendSuccess(result).stringify())
    }

    async requestAddNewHistory(req:Request,res:Response){
        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)
        const history:TrainingDay[] = JSON.parse(req.body.history)

        history.forEach(training =>{
            this.gateway.addNewHistory(user["id"], training)
        })
        res.status(200);
        res.end(new SendSuccess("History was added").stringify())
    }

    async requestDeleteHistory(req:Request,res:Response){
        const history:number[] = JSON.parse(req.body.history)

        history.forEach(id =>{
            this.gateway.deleteHistory(id);
        })

        res.status(200)
        res.end(new SendSuccess("History was deleted successful").stringify())
    }
}


export default new HistoryController()