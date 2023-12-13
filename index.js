const express = require("express");
const { spawn } = require("child_process");

const { PORT = 3000 } = process.env;

const app = express();

app.get("/", (req, res) => {
  // res.send("bip bop");
  let dataToSend;

  const pythonProcess = spawn("python", ["src/scripts/script.py"]);
  // collect data from script
  pythonProcess.stdout.on("data", function (data) {
    dataToSend = data.toString();
    console.log(dataToSend);
  });

  // close stream from child process
  pythonProcess.on("exit", (code) => {
    console.log(`Data sent successfully`);
    console.log(dataToSend);
    res.send(dataToSend);
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
