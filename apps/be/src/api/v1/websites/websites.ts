import { Router } from "express";

import { AuthValidation } from "../../../middleware";
import prisma from "@packages/db/client";
import { website_status } from "../../../../../../packages/db/generated/prisma/enums";

const WebsiteRouter = Router();

WebsiteRouter.post("/website", AuthValidation ,async (req, res) => {

  let url_value = req.body;
  let user_id = req.user_id!;
  if(!url_value.url) {
    res.status(400).json({
      message : "Please provide the url value in the body"
    })
  }
  // creating the website data in db

  console.log(user_id, url_value)
  try {
    let website_res = await prisma.websites.create({
      data:{
        url:url_value.url, 
        userId:Number.parseInt(user_id),
        time_added : new Date()
      }
    })
    res.json({
      message:"successfully created the website",
      website_id : website_res.id
    })

  }catch (e) {
    console.log(e, "error while adding the data to the databse")
  }

});

WebsiteRouter.get("/status/:website_id", AuthValidation, async (req, res) => {

  let website_id = req.params.website_id! as string;
  let user_id = req.user_id!;
  let website_res = await prisma.websites.findFirst({
    where:{
      id:website_id,
      userId:parseInt(user_id)
    },
    include : {
        ticks : {
          take:1, 
          orderBy :[{
            "time_added":"desc"
          }]
        }   
    }
  }) 

  if (!website_res) {
    res.status(409).json({
      message:"Conflict"
    })
    return;
  }

  res.json({
    url : website_res.url,
    id : website_res.id,
    user_id : website_res.userId
  })

});

export default WebsiteRouter;