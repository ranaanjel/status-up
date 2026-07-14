"use server"

import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

let userEp = BACKEND_URL+"/api/v1/users";
let websiteEp = BACKEND_URL+"/api/v1/websites";
interface UserData {
        name:String,
        email: String,
        password: String
    }

export async function fillForm(state:{type:string, token:string, success:boolean}, formdata:FormData) {

    // signing and signin up based upon the things and sending the values.
    // await new Promise((res)=>{setTimeout(res,2000)})

    let data :UserData = {
        name: formdata.get("user") as string,
        email: formdata.get("email") as string,
        password: formdata.get("pass") as string
    }

   let actionTodo = state.type;
    
   if(!actionTodo) {
    return {
        success:false,
        type:'',
        token:""
    }
   }

   if(actionTodo == "signin") {
    let signin_res = await signIn(data);

    if(signin_res == "") {

    return {
        success:false,
        type:state.type, 
        token :signin_res 
    }
    }

    return {
        success:true,
        type:state.type, 
        token :signin_res 
    }
   } 
   
   if (actionTodo == "signup") {
    //return required in case of the signup
    if(await signUp(data)) {

        return {
            success:true,
            type:state.type, 
            token : ""
        }
        }
   }

    return {
        success:false,
        type:state.type, 
        token : ""
    }

}

export async function addWebsite(url:string) {
    
    let cookieSet  = await cookies();
    let token = cookieSet.get("session");

        try {
          let res =  await axios.post(websiteEp+"/website", {
            url
        }, {
            headers :{
                Authorization:token?.value
            }
        })
        // console.log(res, "-----------------")
        }
        catch (err) {
            console.log("some error occured while adding website to database")
        }

    return {}
}

export async function getWebsiteInformation(id:string) {
     let cookieSet  = await cookies();
    let token = cookieSet.get("session");

    //console.log(token)

    try {
        
        let res = await axios.get(BACKEND_URL+"/api/v1/websites/status/"+id, {
        headers : {
            Authorization :token?.value
        }}); 
        return (res.data);
    }catch(err) {
        console.log('some issue while fetching the data')
        return ""
    }

}


async function signIn(data:UserData) : Promise<string > {
    try {
        console.log(userEp + "/signin")
           let res = await axios.post(userEp+"/signin", data);
            let cookieSet  = await cookies();
            cookieSet.set("session", res.data.jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  })
           return res.data.jwt;
    }catch (err) {
        console.log("error while signing in")
    }
    return ""
}
async function signUp(data:UserData) : Promise<boolean> {
    
    try {
        
    console.log(userEp + "/signup")
    let res = await axios.post(userEp+"/signup", data);
    return true;
        }
        catch (err ) {
            return false;
        }
}
export async function signOut( ) {

    let cookieSet  = await cookies();
            cookieSet.set("session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  })


}
export async function fetchWebsite() {
    let cookieSet  = await cookies();
    let token = cookieSet.get("session");

    //console.log(token)

    try {
        
        let res = await axios.get(BACKEND_URL+"/api/v1/websites/website", {
        headers : {
            Authorization :token?.value
        }
    })

    return res.data;

} catch (err) {
        console.log("error while fetching the data")
    }

}