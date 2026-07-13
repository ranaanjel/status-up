import express from "express";
import UserRouter from "./api/v1/users/users";
import WebsiteRouter from "./api/v1/websites/websites";

let app = express();

app.use(express.json())
app.use("/api/v1/users/", UserRouter);
app.use("/api/v1/websites/", WebsiteRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
