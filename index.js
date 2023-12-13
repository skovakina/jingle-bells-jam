import "./pages/index.css";

const { spawn } = require("child_process");

app.get("/", (req, res) => {
  let dataToSend;

  const pythonProcess = spawn("python3", ["scripts/script.py"]);
  // collect data from script
  pythonProcess.stdout.on("data", function (data) {
    dataToSend = data.toString();
  });

  // close stream from child process
  pythonProcess.on("exit", (code) => {
    console.log(`Data sent successfully`);
    res.send(dataToSend);
  });
});
