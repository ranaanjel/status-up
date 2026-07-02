// function for creating the users and running it for the website tests

import axios from "axios";

export const USER_NAME = Math.random().toString();
export const BACKEND_URL = "http://localhost:3000/api/v1/users"; 

export async function randomUser(): Promise<{
    user_id: string , jwt:string 
}> {

    let user_id : string = "";
    let token : string = "";

    let RANDOM_USER = Math.random().toString();

    //creating a fake user - sign up
    console.log(RANDOM_USER)
    let signup_res = await axios.post(
        BACKEND_URL+"/signup", {
                    name:RANDOM_USER, 
                    password : "same_password",
                    email : RANDOM_USER+"@gmail.com"
                
        }
    )
    user_id  = signup_res.data.user_id!;
    console.log(user_id, "======================")
    // signin
   let signin_res = await axios.post(
        BACKEND_URL+"/signin", {
                name:RANDOM_USER, 
                    password : "same_password",
                    email : RANDOM_USER+"@gmail.com"
                
        }
    )

    token = signin_res.data.jwt

    return {
        user_id, jwt:token
    }
}