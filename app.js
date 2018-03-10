const express = require("express");
const app = express();
const CronJob = require("cron").CronJob;
const run = require('./run');

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

// new CronJob("* * * * *", () => { run() }, null, true, "Pacific/Auckland");

run();