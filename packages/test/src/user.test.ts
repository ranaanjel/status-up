import {describe, it, expect} from "bun:test"
import axios from "axios"
import { BACKEND_URL, USER_NAME } from "./util"

describe("test signup endpoints",()=> {
    it("signup should not happen", async () => {
      try {
        let signupRes = await axios.post(BACKEND_URL+"/signup", {
                data :{
                }
            });
            expect(false, "Control shouldn't reach here");
        }
      catch (e) {
        console.log( "ERR")
      }
    })
    it("signin should happen", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signup", {
                    name:USER_NAME, 
                    password : "same_password",
                    email : USER_NAME+"@gmail.com"
                
            });
            expect(signupRes.data.user_id).toBeDefined();
            expect(signupRes.status).toBe(200);
            // console.log(signupRes.status)

        }
      catch (e) {
        console.log(e, "ERR")
        expect(false, "not to be coming here")
      }
    })
})

describe("test signin endpoints",()=> {

    it("signin should not happen due to lack of data", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signin", {
                
            });
            expect(false, "should reach here - above should throw error");
        }
      catch (e) {
        console.log( "ERR")
      }

    })

    it("signin should not happen due to wrong info", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signin", {
                
                    name:USER_NAME, 
                    password : "wrong_password",
                    email : USER_NAME+"@gmail.com"
                
            });
            expect(false, "shouldn't reach here, above should throw error");
        }
      catch (e) {
        console.log( "ERR")
      }

    })

    it("sign should happen", async () => {
          try {
        let signinRes = await axios.post(BACKEND_URL+"/signin", {
                    name:USER_NAME, 
                    password : "same_password",
                    email : USER_NAME+"@gmail.com"

            });
            expect(signinRes.status).toBe(200);
            expect(signinRes.data.jwt).toBeDefined();
        }
      catch (e) {
        console.log( "ERR")
        expect(false, "not to be coming here ")
      } 
    })

})