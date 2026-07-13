import  {xAddBulk}  from "@packages/redis/client";
import prisma from "@packages/db/client";
import { send } from "node:process";

async function main() {
    // getting the all the url from the database and sending to the redis stream simple.

    let websites = await prisma.websites.findMany();

    if(websites) {
        let sendingData = websites.map((value) => 
            {
                let url = value.url; 
                let id = value.id;
            
                return {url, id}
            }
        );
        xAddBulk(sendingData)
    }
}

setInterval(main, 1000*60*3)
main();