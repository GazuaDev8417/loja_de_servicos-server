import ConnectDatabase from "./ConnectDatabase"
import { User } from "../model/types"
import InsertUser from "../model/InsertUser"


export default class UserData extends ConnectDatabase{
    protected USER_TABLE = 'labeninja_users'

    findByEmail = async(email:string):Promise<User>=>{
        try{

            const [user] = await ConnectDatabase.con(this.USER_TABLE).where({
                email
            })

            return user
        }catch(e){
            throw new Error('Erro ao buscar usuário')
        }
    }


    findById = async(id:string):Promise<User>=>{
        try{

            const [user] = await ConnectDatabase.con(this.USER_TABLE)
                .where({ id })

            return user
        }catch(e){
            throw new Error(`Erro ao buscar usuário: ${e}`)
        }
    }


    create = async(user:InsertUser):Promise<void>=>{
        try{

            await user.save()

        }catch(e){
            throw new Error(`Erro ao criar usuário ${e}`)
        }
    }
}