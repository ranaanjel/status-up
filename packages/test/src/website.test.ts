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
        console.log(e, "ERR")
      }
    })
    it("signin should happen", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signup", {
                data :{
                    name:USER_NAME, 
                    password : "same_password",
                    email : USER_NAME+"@gmail.com"
                }
            });
            expect(signupRes.data.id).toBeDefined();
            expect(signupRes.status).toBe(200);

        }
      catch (e) {
        console.log(e, "ERR")
      }
    })
})

describe("test signin endpoints",()=> {

    it("signin should not happen due to lack of data", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signin", {
                data :{
                }
            });
            expect(false, "should reach here - above should throw error");
        }
      catch (e) {
        console.log(e, "ERR")
      }

    })

    it("signin should not happen due to wrong info", async () => {
          try {
        let signupRes = await axios.post(BACKEND_URL+"/signin", {
                data :{
                    name:USER_NAME, 
                    password : "wrong_password",
                    email : USER_NAME+"@gmail.com"
                }
            });
            expect(false, "shouldn't reach here, above should throw error");
        }
      catch (e) {
        console.log(e, "ERR")
      }

    })

    it("sign should happen", async () => {
          try {
        let signinRes = await axios.post(BACKEND_URL+"/signin", {
                data :{
                    name:USER_NAME, 
                    password : "same_password",
                    email : USER_NAME+"@gmail.com"
                }
            });
            expect(signinRes.status).toBe(200);
            expect(signinRes.data.jwt).toBeDefined();
        }
      catch (e) {
        console.log(e, "ERR")
      } 
    })

})