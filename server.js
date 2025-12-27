const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());

app.get("/ping", (req, res) => {
  const ip = req.query.ip;

  exec(`ping -c 1 ${ip}`, (error, stdout) => {
    if (error) {
      return res.json({ status: "DOWN", latency: "-" });
    }

    const match = stdout.match(/time=(\d+\.?\d*)/);
    const latency = match ? match[1] + " ms" : "-";

    res.json({ status: "UP", latency });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ping API running"));
