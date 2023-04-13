import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js";

export class ExerciseGateway{
    
    constructor(private controller:DatabaseAdapter){}

    async getAllExercises():Promise<object[]>{
        const result = await this.controller.select("SELECT * FROM exercise",{})
        return result
    }

    async getExerciseById(id:number):Promise<object[]>{
        const result = await this.controller.select("SELECT * FROM exercise WHERE id = :id", {id:id})
        return result
    }

    async addNewExercise(name:string,type:number):Promise<boolean>{
        const result = this.controller.insert("INSERT INTO exercise(exercise_name, exercise_type) VALUES (:name, :type)",{name:name.toLowerCase(),type:type})
        return result
    }

    async deleteExerciseById(id:number):Promise<boolean>{
        const result = this.controller.delete("DELETE FROM exercise WHERE id = :id",{id: id})
        return result
    }
}
