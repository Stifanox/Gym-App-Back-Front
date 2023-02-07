import {Sequelize} from "sequelize"

export class PostgresDatabase{
    private static sequalize: Sequelize = null;

    
    /**
     * Establish connection to Postgresql database (if not already connected) than returns instance.
     * @returns Database instance
     */
    public static async getInstance() {
        if(PostgresDatabase.sequalize === null){

            PostgresDatabase.sequalize = new Sequelize("postgres://uquglqql:2HHlRUhRguXR1eM3vxYRyuj9VE_vpa76@hattie.db.elephantsql.com/uquglqql")
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