import { Request } from "express"
import { Job } from "../model/types"
import ConnectDatabase from "./ConnectDatabase"


export default class JobData extends ConnectDatabase{
    protected JOB_TABLE = 'labeninja_pub'

    findByProvider = async(id:string):Promise<Job[]>=>{
        try{

            const job:Job[] = await ConnectDatabase.con(this.JOB_TABLE).where({
                provider: id
            })

            return job
        }catch(e){
            throw new Error(`Errro ao buscar serviços: ${e}`)
        }
    }


    findById = async(req:Request):Promise<Job>=>{
        try{

            const [job] = await ConnectDatabase.con(this.JOB_TABLE).where({
                id: req.params.id
            })

            return job
        }catch(e){
            throw new Error(`Erro ao buscar serviço: ${e}`)
        }
    }

    
    create = async(job:Job):Promise<void>=>{
        try{
            
            await ConnectDatabase.con(this.JOB_TABLE).insert(job)

        }catch(e){
            throw new Error(`Error ao criar serviço: ${e}`)
        }
    }


    getAllJobs = async():Promise<Job[]>=>{
        try{

            const jobs = await ConnectDatabase.con(this.JOB_TABLE)

            return jobs
        }catch(e){
            throw new Error(`Erro ao buscar serviços: ${e}`)
        }
    }


    delJob = async(req:Request):Promise<void>=>{
        try{

            await ConnectDatabase.con(this.JOB_TABLE).del().where({
                id: req.params.id
            })

        }catch(e){
            throw new Error(`Falho ao deletar serviço: ${e}`)
        }
    }
}