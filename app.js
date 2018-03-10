const express = require("express");
const app = express();
const fs = require("fs");
var format = require("date-fns/format");
var https = require("https");
var agent = require("superagent");
var CronJob = require("cron").CronJob;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

new CronJob("* * * * *", () => {}, null, true, "Pacific/Auckland");

const getUpdates = () => {
  for (var i = 0; i < subredditList.length; i++) {
    getNewPosts(subredditList[i]);
    getHotPosts(subredditList[i]);
  }
};

const getNewPosts = subreddit => {
  fs.readFile("./data/" + subreddit.name + "/new");
  var posts = getPosts(subreddit, "new");
};

const getHotPosts = subreddit => {
  var posts = getPosts(subreddit, "hot");
};

const subredditList = [
  {
    name: "r_ethtrader",
    url: "https://www.reddit.com/r/ethtrader/"
  },
  {
    name: "r_ethereum",
    url: "https://www.reddit.com/r/ethereum/"
  },
  {
    name: "r_ethmarket",
    url: "https://www.reddit.com/r/ethmarket/"
  },
  {
    name: "r_ethermining",
    url: "https://www.reddit.com/r/EtherMining/"
  },
  {
    name: "r_bitcoin",
    url: "https://www.reddit.com/r/Bitcoin/"
  },
  {
    name: "r_bitcoinmarkets",
    url: "https://www.reddit.com/r/BitcoinMarkets/"
  },
  {
    name: "r_cryptocurrency",
    url: "https://www.reddit.com/r/CryptoCurrency/"
  },
  {
    name: "r_cryptomarkets",
    url: "https://www.reddit.com/r/CryptoMarkets/"
  }
];

var jsonToFile = (data, subreddit, type) => {
  var fileName = format(Date(), "DD-MM-YYYY_HH-mm");
  var path = "data/" + subreddit + "/" + type;
  fs.writeFile(
    path + fileName + ".json",
    JSON.stringify(data, null, 4),
    err => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
};

var getNewPosts = () => {
  agent
    .get("https://www.reddit.com/r/ethereum/new.json")
    .query({ query: "Manny", range: "1..5", order: "desc" })
    .then(res => {
      jsonToFile(res.body.data.children);
    });
};

var getPosts = (subreddit, type) => {
  agent
    .get(subreddit + type + ".json")
    .query({ query: "Manny", range: "1..5", order: "desc" })
    .then(res => {
      return res.body.data;
    });
};
