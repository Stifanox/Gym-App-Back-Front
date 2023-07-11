import { Request, Response } from "express"
import PostgresDBController from "../../../database/PostgresDBController.js"
import { CycleGateway } from "../../../gateways/cycle_gateways/CycleGateway.js"
import { SendError } from "../../../responses/SendError.js"
import { SendSuccess } from "../../../responses/SendSuccess.js"
import { verifyWebToken } from "../../../utils/user_utils/functions/WebtokenUtils.js"

class CycleController{

    private gateway:CycleGateway

    constructor() {
        this.gateway = new CycleGateway(PostgresDBController)
    }

    async requestGetCycleById(req:Request,res:Response){
        const id = parseInt(req.params.id)

        const result = await this.gateway.getCycleById(id)

        res.status(200)
        res.end(new SendSuccess(result).stringify())
    }

    async requestGetCyclesByUserId(req:Request,res:Response){
        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)
        
        const result = await this.gateway.getCyclesByUserId(user["id"])

        res.status(200)
        res.end(new SendSuccess(result).stringify())
    }

    async requestAddNewCycle(req:Request,res:Response){
        const {name} = req.body
        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)

        const result = await this.gateway.addNewCycle((name as string).toLowerCase(),user["id"])

        if(result){
            res.status(200)
            res.end(new SendSuccess("Cycle has been added").stringify())
        }else{
            res.status(200)
            res.end(new SendError("Couldn't add new cycle").stringify())
        }
    }

    async requestEditCycle(req:Request,res:Response){
        const {name, id} = req.body

        const result = await this.gateway.editCycle(name,id)

        if(result){
            res.status(200)
            res.end(new SendSuccess("Changed name of a cycle").stringify())
        }else{
            res.status(200)
            res.end(new SendError("Couldn't change name of a cycle").stringify())
        }
    }

    async requestDeleteCycle(req:Request, res:Response){
        const name = req.params.name

        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)

        const result = await this.gateway.deleteCycle(name, user["id"])

        if(result){
            res.status(200)
            res.end(new SendSuccess("Deleted cycles").stringify())
        }else{
            res.status(200)
            res.end(new SendError("Couldn't delete cycles").stringify())
        }
    }
}

export default new CycleController()