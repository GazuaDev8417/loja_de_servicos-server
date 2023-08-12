import { Request, Response } from "express";
import JobBusiness from "../business/JobBusiness";
import { JobInput } from "../model/types";


export default class JobController{
    constructor(
        private jobBusiness:JobBusiness
    ){}

    create = async(req:Request, res:Response):Promise<void>=>{
        const { title, description, phone, period } = req.body
        const input:JobInput = {
            title,
            description,
            phone,
            period
        }
        try{

            await this.jobBusiness.create(input, req)

            res.status(201).send(`Serviços ${title} criado com sucesso`)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    getAllJobs = async(req:Request, res:Response):Promise<void>=>{
        try{

            const jobs = await this.jobBusiness.getAllJobs()

            res.status(200).send(jobs)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)             
        }
    }


    jobsByProvider = async(req:Request, res:Response):Promise<void>=>{
        try{

            const jobs = await this.jobBusiness.jobsByProvider(req)

            res.status(200).send(jobs)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    findById = async(req:Request, res:Response):Promise<void>=>{
        try{

            const job = await this.jobBusiness.findById(req)

            res.status(200).send(job)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    delJob = async(req:Request, res:Response):Promise<void>=>{
        try{

            const job = await this.jobBusiness.delJob(req)

            res.status(200).send(`${job.title} removido`)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }

}