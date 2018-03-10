const fs = require("fs");
const format = require("date-fns/format");
const agent = require("superagent");
const subredditList = require('./constants/subredditList.json');

const jsonToFile = (data = [], folder, subfolder, filename) => {
    var path = "data/" + folder + "/" + subfolder;
    fs.writeFile(
        path + filename + ".json",
        JSON.stringify(data, null, 4),
        err => {
            if (err) console.log(err);
            console.log("The file has been saved!");
        }
    );
};

const openFile = (folder, subfolder, name) => {
    const path = './data' + folder + '/' + subfolder + '/' + name;
    console.log('path: ' + path);
    let result = [];
    try {
        fs.readSync(path, (err, data) => {
            if (err) {
                console.log(err)
            }
            result = data;
        })
    } catch (e) {
        fs.writeFile(path, "");
    }

    return result;
}


const getPosts = (url, type) => {
    agent
        .get(url + type + ".json")
        .query({ query: "Manny", range: "1..5", order: "desc" })
        .then(res => {
            return res.body.data;
        });
};

const run = () => {
    for (var i = 0; i < subredditList.length; i++) {
        const subreddit = subredditList[i];

        const newPosts = getPosts(subreddit.url, 'new');
        let existingPosts = openFile(subreddit.name, 'new', 'index');
        existingPosts = {
            ...existingPosts,
            newPosts
        };
        jsonToFile(existingPosts, subreddit.name, 'new', 'index');

        const timeStampedFileName = format(Date(), "DD-MM-YYYY_HH-mm");
        const hotPosts = getPosts(subreddit.url, 'hot');
        jsonToFile(newPosts, subreddit.name, 'hot', timeStampedFileName);

    }


}

module.exports = run;