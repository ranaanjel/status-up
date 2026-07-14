import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function AuthLayout({children}:{children:React.ReactNode}) : Promise<React.ReactNode> {

    // verify the users in here
    let cookiesGet = await cookies();
    let token = cookiesGet.get("session");
    
    // console.log(token, "-- cookies");

    if(!token?.value) {
        redirect("/signin")
    }

    return <>{children}</>

}