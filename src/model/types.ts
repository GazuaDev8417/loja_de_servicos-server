export type User = {
    id:string
    name:string
    email:string
    password:string
    subscription:string
}

export type SignupInput = {
    name:string
    email:string
    password:string
    confirmPass:string
}

export type LoginInput = {
    email:string
    password:string
}

export type Job = {
    id:string,
    title:string
    description:string
    phone:string
    period:string
    provider:string
}

export type JobInput = {
    title:string
    description:string
    phone:string
    period:string
}