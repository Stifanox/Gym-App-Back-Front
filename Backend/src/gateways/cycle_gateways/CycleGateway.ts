import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js";

export class CycleGateway{

    constructor(private controller:DatabaseAdapter){}

    async getCycleById(id:number):Promise<object[]>{
        const result = await this.controller.select("SELECT * FROM exercises WHERE id = :id",{id:id})
        return result
    }

    async getCyclesByUserId(userId:number){
        const result = await this.controller.select("SELECT * FROM exercises WHERE user_id = :userId",{userId:userId})
        return result
    }

    async addNewCycle(name:string,userId:number){
        const result = await this.controller.insert("INSERT INTO training_cycle(user_id, cycle_name) VALUES (:userId, :name)",{name:name,userId:userId})
        return result
    }

    async editCycle(name:string, id:number){
        const result = await this.controller.update("UPDATE training_cycle SET cycle_name = :cycleName WHERE id = :id",{cycleName:name,id:id})
        return result
    }
}