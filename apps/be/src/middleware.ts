import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"


export async function AuthValidation(req:Request, res:Response, next:NextFunction){

    // getting auth token 
    let token = req.headers.authorization;

    if(!token) {
        res.status(403).json({
            message:"Unauthorized"
        })
        return ; 
    }

    // verifying the token
    let user_token = jwt.verify(token, process.env.JWT_SECRET!)!;
    req.user_id = token; 
    next();
}