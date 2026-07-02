import {z} from "zod" ;

export const AuthInput = z.object({
    name:z.string(),
    password:z.string(),
    email:z.string().optional()
})