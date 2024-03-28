import knex from 'knex'
import { config } from 'dotenv'


config()



export default abstract class ConnectDatabase{
    protected static con = knex({
        client: 'pg',
        connection: process.env.VERCEL_POSTGRESQL
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