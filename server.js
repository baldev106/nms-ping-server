const express = require("express");
const cors = require("cors");
const net = require("net");

const app = express();
app.use(cors());

app.get("/ping", (req, res) => {
  const ip = req.query.ip;
  const port = 80; // HTTP port

  const socket = new net.Socket();
  const start = Date.now();

  socket.setTimeout(3000);

  socket.connect(port, ip, () => {
    const latency = Date.now() - start;
    socket.destroy();
    res.json({ status: "UP", latency: latency + " ms" });
  });

  socket.on("error", () => {
    res.json({ status: "DOWN", latency: "-" });
  });

  socket.on("timeout", () => {
    socket.destroy();
    res.json({ status: "DOWN", latency: "-" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ping API running"));
