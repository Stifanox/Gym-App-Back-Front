import { TrainingDay } from "../../actions/user_actions/cycles_routes/TrainingDay.js";
import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js";

export class TrainingDayGateway{
    

    constructor(private controller: DatabaseAdapter) {}

    async addNewTrainingDay(trainingDay:TrainingDay):Promise<boolean>{
        const result = await this.controller.insert("INSERT INTO training_day(training_day, exercise_id, weight, reps, training_cycle_id,sets) VALUES (:trainingDay, :exerciseId, :weight, :reps, :trainingCycleId, :sets)",trainingDay);
        return result
    }

    async editTrainingDay(trainingDay:TrainingDay){
        const result = await this.controller.update("UPDATE training_day SET training_day = :trainingDay, exercise_id = :exerciseId, weight = :weight, reps = :reps, training_cycle_id = :trainingCycleId, sets = :sets WHERE id = :id", trainingDay)
        return result 
    }

    async deleteTrainingDay(id:number){
        const result = await this.controller.delete("DELETE FROM training_day WHERE id = :id",{id:id})
        return result
    }

    async getTrainingByCycleId(id:number){
        const result = await this.controller.select("SELECT * FROM training_day WHERE training_cycle_id = :id",{id:id})
        return result
    }
}