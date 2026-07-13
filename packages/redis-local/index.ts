import {createClient} from "redis"

// connecting to the client ; 

const KEY = "uptimebetter:website";

let rc = await createClient().on("error", () => {
    console.log("some error occured while connecting to the redis client")
}).connect();

// creating a func for adding to the streams
type website_fetch = {url:string, id:string}
 async function xAdd(url:string, id:string) {
    // we can check for the duplicates as well but for now it is a debt.
    const res1 = await rc.xAdd(
  KEY , '*', {
    url ,
    id 
  }
);
    
}
// creating a function for adding in bulk to the stream
export async function xAddBulk(website_info : website_fetch[]) {
    website_info.forEach(async (value) => {
      await  xAdd(value.url, value.id);
    })
}
// creating a function for reading from the stream;

export async function xReadGroup(region : string, worker: string) {

    // getting the value from the streams;
    const res = await rc.xReadGroup(
   region ,
  worker , {
    key: KEY,
    id: '>'
  }, {
    COUNT: 4
  }
);

    if (! res?.[0] ) {
        return;
    }

    return res[0].messages;
}


// creating a function for acknowledgement in the stream;

async function xAck(id:string, region_id : string) {

    await rc.xAck(KEY, region_id, id)

}
export function xAckBulk(region_id:string, id:string[], ) {
    id.map(idValue => xAck(region_id, idValue));
}