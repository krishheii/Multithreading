/*
 * File Name: index.js
 * Description: This is the main thread
 */

const express = require("express");
const { Worker } = require("worker_threads");
const app = express();
const port = 3000;

const getSum = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};

app.get("/", (req, res) => {
  const result = getSum(1000);
  res.send(`Processed function getSum on main thread and result: ${result}`);
});

app.get("/seprate-thread", (req, res) => {
  const seprateThread = new Worker(__dirname + "/seprateThread.js");
  seprateThread.on("message", (result) => {
    res.send(`Processed function getSum on seprate thread: ${result}`);
  });
  seprateThread.postMessage(1000);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
