import { Router } from "express";
import { AuthInput } from "../../../config/valid";


import jwt from "jsonwebtoken"

import prisma from "@packages/db/client";
const UserRouter = Router();
let secret_jwt = process.env.JWT_SECRET!;

UserRouter.post("/signin", async (req, res) => {
  let dataValid = AuthInput.safeParse(req.body);

  if (!dataValid.success) {
    res.status(403).send("Error");
    return;
  }

  try {
    let user = await prisma.users.findFirst({
      where : {
        name : dataValid.data.name
      }
    })
    
    if(!user) {
      res.status(403).json({
        message:"user not found"
      })
      return ;
    }

    if ( user.password == dataValid.data.password ) {
      console.log(secret_jwt)
      let token = jwt.sign({
        sub: user.id
      }, secret_jwt)

      res.json({
        jwt:token
      })
    } else {
      res.status(403).json({
        message:"wrong password"
      })
    }
  } catch (e) {
    res.status(403).send("Error");
    return;
  }


});
UserRouter.post("/signup", async (req, res) => {
  let dataValid = AuthInput.safeParse(req.body);
  
  if (!dataValid.success) {
    res.status(403).send("Error");
    return;
  }
  // creating the user
  try {
    let user = await prisma.users.create({
      data: {
        name: dataValid.data.name,
        email: dataValid.data.email!,
        password: dataValid.data.password
      }
    })
    res.json({
      user_id : user.id
    })
  } catch (e) {
    console.log(e)
    res.status(403).send("Error");
    return;
  }

});

export default UserRouter;
