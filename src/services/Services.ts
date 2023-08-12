import * as jwt from 'jsonwebtoken'
import bcrypt, { compareSync } from 'bcryptjs'
import { v4 } from 'uuid'
import { config } from 'dotenv'


config()

type TokenData = {
    payload:string
    iat:number
    exp:number
}

export default class Services{
    idGenerator = ():string=>{
        return v4()
    }


    token = (payload:string):string=>{
        return jwt.sign(
            { payload },
            process.env.JWT_KEY as string,
            { expiresIn: '1h' }
        )
    }

    tokenData = (token:string):TokenData=>{
        return jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as TokenData
    }


    hash = (txt:string):string=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(txt, salt)

        return cypher
    }

    compare = (txt:string, hash:string):boolean=>{
        return compareSync(txt, hash)
    }
}