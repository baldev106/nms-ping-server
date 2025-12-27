const express = require("express");
const ping = require("ping");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/ping", async (req,res)=>{
  const ip = req.query.ip;
  const result = await ping.promise.probe(ip);
  res.json({
    status: result.alive ? "UP" : "DOWN",
    latency: result.time || "-"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Ping API running"));
