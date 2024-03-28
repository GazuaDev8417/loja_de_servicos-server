import { Request } from 'express'
import UserData from "../data/UserData"
import InsertUser from "../model/InsertUser"
import { LoginInput, SignupInput, User } from "../model/types"
import authToken from "../services/AuthToken"
import Services from "../services/Services"


export default class UserBusiness{
    constructor(
        private userData:UserData,
        private services:Services
    ){}

    signup = async(input:SignupInput):Promise<string>=>{
        const { name, email, password } = input

        if(!name || !email || !password){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        if(password.length < 6){
            throw{
                statusCode: 403,
                error: new Error('A senha deve ter o mínimo de 6 caracteres')
            }
        }
        
        const registeredUser = await this.userData.findByEmail(email)
        if(registeredUser){
            throw{
                statusCode: 403,
                error: new Error('Usuário já cadastrado')
            }
        }

        const id = this.services.idGenerator()
        const hash = this.services.hash(password)
        const token = this.services.token(id)

        const user = new InsertUser(
            id,
            name,
            email,
            hash,
        )

        await this.userData.create(user)

        return token
    }


    login = async(input:LoginInput):Promise<string>=>{
        const { email, password } = input

        if(!email || !password){
            throw{
                statusCode: 401,
                error: new Error('Preencha os campos')
            }
        }

        const registeredUser = await this.userData.findByEmail(email)
        if(!registeredUser){
            throw{
                statusCode: 404,
                error: new Error('Usuário não encontrado')
            }
        }

        const compare = this.services.compare(password, registeredUser.password)
        if(!compare){
            throw{
                statusCode: 404,
                error: new Error('Usuaŕio não encontrado')
            }
        }

        const token = this.services.token(registeredUser.id)

        return token
    }


    findById = async(req:Request):Promise<User>=>{
        const user = await authToken(req)

        return user
    }
}