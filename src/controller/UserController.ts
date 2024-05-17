import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"
import { LoginInput, SignupInput, User } from "../model/types"




export default class UserController{
    constructor(
        private userBusiness:UserBusiness
    ){}

    signup = async(req:Request, res:Response):Promise<void>=>{
        const { name, email, password } = req.body
        const input:SignupInput = {
            name,
            email,
            password
        }

        try{

            const token = await this.userBusiness.signup(input)

            res.status(201).send(token)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    login = async(req:Request, res:Response):Promise<void>=>{
        const { email, password } = req.body
        const input:LoginInput = { email, password }

        try{

            const token = await this.userBusiness.login(input)

            res.status(200).send(token)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }


    findById = async(req:Request, res:Response):Promise<void>=>{
        try{

            const user:User = await this.userBusiness.findById(req)

            res.status(200).send(user)
        }catch(e:any){
            let statusCode = e.statusCode || 400
            let message = e.error === undefined ? e.message : e.error.message
            res.status(statusCode).send(message || e.sqlMessage)
        }
    }
}