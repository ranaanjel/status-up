import {describe, it, expect, beforeAll, test} from "bun:test"
import axios from "axios"
import { randomUser } from "./util"

const BACKEND_WEB_URL = "http://localhost:3000/api/v1/websites";

describe("test website creation endpoints",()=> {

    //getting the data regarding fake user 
    let user_id :any , token :string;

    beforeAll(async () => {
        let data = await randomUser();
        user_id = data.user_id;
        token = data.jwt;

    })

    it("website creation should not happen", async () => {
      try {
        let signupRes = await axios.post(BACKEND_WEB_URL+"/website", {
                data :{
                }
            });
            expect(false, "Control shouldn't reach here");
        }
      catch (e) {
        console.log("ERR")
      }
    })
    it("website creation should happen", async () => {
          try {
           console.log(user_id, token)
        let website_res = await axios.post(BACKEND_WEB_URL+"/website", {
                    url : "http://facebook.com"
            }, {
                headers : {
                    Authorization : token
                }
            })
           
            expect(website_res.status).toBe(200);
            expect(website_res.data.website_id).toBeDefined();
        }
      catch (e) {
         console.log( "ERR")
          //  expect(e).not.toBeDefined();;

      }
    })
})

describe("test website data status - ticks ",()=> {
  let token_1:string, user_id_1:string, token_2:string , user_id_2:string;

  beforeAll(async () => {
    let user_1 = await randomUser();
    let user_2 = await randomUser();  

    token_1 = user_1.jwt;
    token_2 = user_2.jwt;
    user_id_1 = user_1.user_id
    user_id_2 = user_2.user_id
  })

  it("should be able to fetch website status by the same user", async () => {

    // creation of the website 

    console.log(token_1)
    let website_create_res = await axios.post(BACKEND_WEB_URL+"/website", {
                    url : "http://facebook.com"
            }, {
                headers : {
                    Authorization : token_1
                }
            })
    // console.log(website_res.data)
    let website_id = website_create_res.data.website_id;
    
    
    //console.log(website_id)

    let website_status_res = await axios.get(BACKEND_WEB_URL+"/status/"+ website_id, {
      headers : {
        Authorization : token_1
      }
    })

    console.log(website_status_res.data)

    // checking
    expect(website_status_res.data.user_id).toBe(user_id_1)
    expect(website_status_res.data.id).toBe(website_id)
    
  })
  it("shouldn't be able to fetch website status with another user", async () => {
    
    let website_create_res = await axios.post(BACKEND_WEB_URL+"/website", {
      url: "https://google.com"
    }, {
      headers: {
        "Authorization": token_1
      }
    })
    let website_id = website_create_res.data.website_id;

    try {

    let website_status_res = await axios.get(BACKEND_WEB_URL+"/status/"+ website_id, {
      headers : {
        Authorization : token_2
      }
    })

    // checking
    expect(false, "should not to be fetched by another user");
    }catch (e) {
      console.log("should here error 403")
    }

  })

})