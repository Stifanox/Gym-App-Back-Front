import { Sequelize,QueryTypes } from "sequelize";
import { DatabaseAdapterInterface } from "./interfaces/DatabaseAdapternterface.js";

import { PostgresDatabase } from "./PostgresDatabase.js";

//TODO: Owrapować wszystko w try catch 
/**
 * Adapter for Postgresql database. It provide basic 4 query types to execute i.e. 
 * SELECT, INSERT, UPDATE, DELETE
 */
class PostgresDBAdapter implements DatabaseAdapterInterface{
    private database:Sequelize

    constructor(){
        this.database = null
        this.getDatabase();
    }
    async select(query: string, replacement: { [key: string]: string } | string[]): Promise<object[]> {
       const result = await this.database.query(query,{type:QueryTypes.SELECT,replacements:replacement})
       return result
    }
    async insert(query: string, replacement: { [key: string]: string } | string[]): Promise<boolean> {
        try{
            const [result,howManyAdded] = await this.database.query(query,{type:QueryTypes.INSERT,replacements:replacement})
            if(howManyAdded > 0) return true
            else return false
        }
        catch(error){
            console.log("Coudln't : ",error);
        }
        
    }
    update(query: string, replacement: { [key: string]: string } | string[]): boolean {
        const result = this.database.query(query,{type:QueryTypes.UPDATE,replacements:replacement})
       return true
    }
    delete(query: string, replacement: { [key: string]: string } | string[]): boolean {
        const result = this.database.query(query,{type:QueryTypes.DELETE,replacements:replacement})
        return true
    }
   

    private async getDatabase(){
        this.database = await PostgresDatabase.getInstance()
    }
}

export default new PostgresDBAdapter()