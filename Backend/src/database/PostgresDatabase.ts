import {Sequelize} from "sequelize"
import { fileURLToPath } from "url";
import dotenv from "dotenv"
import path from "path";

//FIXME: Later to fix the issue 
const filename = fileURLToPath(import.meta.url)
dotenv.config({path:path.join(path.dirname(filename),"../../src/.env")})

export class PostgresDatabase{
    private static sequalize: Sequelize = null;

    
    /**
     * Establish connection to Postgresql database (if not already connected) than returns instance.
     * @returns Database instance
     */
    public static async getInstance() {
        if(PostgresDatabase.sequalize === null){
            PostgresDatabase.sequalize = new Sequelize(process.env.DATABASE_CONNECTION)
            try{
                await this.sequalize.authenticate();
                console.log("Connected succesfully");
            }
            catch(error){
                console.error("Unable to connect. Reason:",error);
            }
        }
        return this.sequalize
    }

}