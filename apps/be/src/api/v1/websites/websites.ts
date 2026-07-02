import { Router } from "express";

import { AuthValidation } from "../../../middleware";

const WebsiteRouter = Router();

WebsiteRouter.post("/website", AuthValidation ,(req, res) => {

  let url_value = req.body;

  if(!url_value) {
    res.status(400).json({
      message : "Please provide the url value in the body"
    })
  }

  res.send("Hello, WebsiteRoute!");
});

WebsiteRouter.get("/status/:website_id", AuthValidation, (req, res) => {
  res.send("Hello, WebsiteRoute!");
});

export default WebsiteRouter;
