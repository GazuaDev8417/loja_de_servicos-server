import ConnectDatabase from "../data/ConnectDatabase"


export default class InsertUser extends ConnectDatabase{
    protected USER_TABLE = 'labeninja_users'

    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string, 
    ){ super() }


    save = async()=>{
        try{

            await ConnectDatabase.con(this.USER_TABLE).insert({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password
            })

        }catch(e){
            throw new Error(`Erro ao crirar usuário: ${e}`)
        }
    }
}