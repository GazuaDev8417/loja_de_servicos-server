import { Request } from "express"
import JobData from "../data/JobData"
import { Job, JobInput } from "../model/types"
import Services from "../services/Services"
import authToken from "../services/AuthToken"



export default class JobBusiness{
    constructor(
        private jobData:JobData,
        private services:Services
    ){}

    create = async(input:JobInput, req:Request):Promise<void>=>{
        const user = await authToken(req) 
        const { title, description, phone, period } = input
        if(!title || !description || !phone || !period){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        const jobs = await this.jobData.findByProvider(user.id)
        if(jobs.length > 0){
            jobs.map(job=>{
              if(
                title === job.title &&
                description === job.description &&
                phone === job.phone &&
                period === job.period
              ){
                throw{
                    statusCode: 403,
                    error: new Error('Você está tentando cadastrar o mesmo serviço novamente!')
                } 
              }
            })
        }
        
        const id = this.services.idGenerator()
        const provider = user.id
        const job:Job = {
            id,
            title,
            description,
            phone,
            period,
            provider
        }

        await this.jobData.create(job)
    }


    getAllJobs = async(req:Request):Promise<Job[]>=>{
        //await authToken(req)
        
        const jobs = await this.jobData.getAllJobs()
        
        if(jobs.length === 0){
            throw{
                statusCode: 404,
                error: new Error('Ainda não foi cadastrado nenhum serviço')
            }
        }

        return jobs
    }


    jobsByProvider = async(req:Request):Promise<Job[]>=>{
        const user = await authToken(req)
        const jobs = await this.jobData.findByProvider(user.id)

        return jobs
    }


    findById = async(req:Request):Promise<Job>=>{
        const job:Job = await this.jobData.findById(req)
        if(!job){
            throw{
                statusCode: 404,
                error: new Error('Serivço não encontrado')
            }
        }

        return job
    }


    delJob = async(req:Request):Promise<Job>=>{
        const user = await authToken(req)
        const job:Job = await this.jobData.findById(req)
        if(!job){
            throw{
                statusCode: 404,
                error: new Error('Serivço não encontrado')
            }
        }

        if(job.provider !== user.id){
            throw{
                statusCode: 404,
                error: new Error('Vocẽ não tem autorização para realizar esta operação')
            }
        }

        await this.jobData.delJob(req)

        return job
    }
}