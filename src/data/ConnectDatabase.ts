import knex from 'knex'
import { config } from 'dotenv'


config()



export default abstract class ConnectDatabase{
    protected static con = knex({
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA
        }
    })

    public static testConnection = async():Promise<void>=>{
        try{

            await this.con.raw('SELECT 1+1 AS result')
            console.log('Conectado ao banco de dados')
        }catch(e){
            console.log(`Erro ao acessar banco de dados: ${e}`)
        }
    }
}

(async()=>{
    await ConnectDatabase.testConnection()
})()