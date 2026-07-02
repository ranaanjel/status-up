import {describe, it, expect, beforeAll} from "bun:test"
import axios from "axios"
import { randomUser } from "./util"

const BACKEND_WEB_URL = "http://localhost:3000/api/v1/websites";

describe("test website creation endpoints",()=> {

    //getting the data regarding fake user 
    let user_id , token :string;

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
           
        let website_res = await axios.post(BACKEND_WEB_URL+"/website", {
                    url : "facebook.com"
            }, {
                headers : {
                    Authorization : token
                }
            });
            
            expect(website_res.status).toBe(200);
            expect(website_res.data.website_id).toBeDefined();
        }
      catch (e) {
         console.log( "ERR")
         expect(false, "not to be failed")
      }
    })
})

describe("test website data status - ticks ",()=> {

    // it("", async () => {
    //       try {
    //     let signupRes = await axios.post(BACKEND_WEB_URL+"/signin", {
    //             data :{
    //             }
    //         });
    //         expect(false, "should reach here - above should throw error");
    //     }
    //   catch (e) {
    //     console.log(e, "ERR")
    //   }

    // })

  

})