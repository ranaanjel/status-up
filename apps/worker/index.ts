import prisma from "@packages/db/client"
import { xAckBulk, xReadGroup } from "@packages/redis/client"
import axios from "axios";


// worker should have the region id and worker id 
// The consumer group should have been made regarding that as well.


// hard setting for the region and worker id : todo 

const REGION_ID =  "f2c472a9-8601-4a30-a342-333643120fc9" ;
const REGION_VALUE = "india" ;
const WORKER_ID =  "1";

async function main() {
    // a loop that keep on running and wait for the new values in the queues
    let res : {id:string, message:{url:string, id:string}}[] = await xReadGroup(REGION_VALUE, WORKER_ID);
    if(res.length == 0 || !res) {
        return ;
    }

    
    let promises = res.map(({message}) => fetch_webinfo(message.url, message.id))
    await Promise.all(promises);

    // acknowledging

    xAckBulk(REGION_VALUE, res.map(obj => obj.id));

}

function fetch_webinfo(url:string, id : string) {


    return new Promise<void>( (resolve, reject)=>{

        let startDate = Date.now(); 
        //  reponse_time_ms Int
        //  status          website_status
        //  websiteId       String
        //  regionId        String
         axios.get(url)        
        .then(async () => {
            // data 
            let currentTime =  Date.now();
            
            await prisma.website_ticks.create({
                data : {
                "reponse_time_ms" : currentTime - startDate,
                "status" : "UP",
                "websiteId" : id,
                "regionId":REGION_ID
            } 
            })

            resolve()
        })
        .catch(async (err) => {
            let currentTime =  Date.now();
            
            await prisma.website_ticks.create({
                data : {
                "reponse_time_ms" : currentTime - startDate,
                "status" : "DOWN",
                "websiteId" : id,
                "regionId":REGION_ID
            } 
            })


            resolve()
        })
    })

}

main()