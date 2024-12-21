const express = require("express");
const cors = require("cors");
const Employee = require("./Routes/route");
const dbConnect = require("./config/dbConnect");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use(express.json());
require("dotenv").config();
dbConnect();

app.use("/Employee", Employee);

app.listen(4000, () => {
  console.log("Server Running");
});
