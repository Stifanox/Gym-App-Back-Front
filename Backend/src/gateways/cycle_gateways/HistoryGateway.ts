import { TrainingDay } from "../../actions/user_actions/cycles_actions/TrainingDay.js";
import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js";

export class HistoryGateway{

    constructor(private controller:DatabaseAdapter) {}

    async getUserHistoryById(id:number){
        const result = await this.controller.select("SELECT * FROM training_history WHERE user_id = :id",{id:id})
        return result
    }

    async addNewHistory(id:number,trainingDay:TrainingDay){
        const result = await this.controller.insert("INSERT INTO training_history(user_id, exercise_id, training_date, training_cycle_id, reps, sets, weight) VALUES (:id, :exerciseId, CURRENT_DATE, :trainingCycleId, :reps, :sets, :weight)",{id:id,...trainingDay})
        return result
    }

    async deleteHistory(id:number){
        const result = await this.controller.delete("DELETE FROM training_history WHERE id = :id",{id:id})
        return result
    }
}