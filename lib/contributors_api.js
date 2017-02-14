const request = require('request');
const fs = require('fs');
require('dotenv').config();

const GITHUB_USER = 'GEDDE5';
//const GITHUB_TOKEN = '4f8e924b6235e2548083b44e2d1ac748349498fc';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USER_AGENT = GITHUB_USER;

function getRepoContributors(repoOwner, repoName, cb) {
  let URL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let options = {
    url: URL,
    headers: { 'User-Agent': USER_AGENT }
  };
  request.get(options, function(err, response, body) {
    if (err) {
      throw err;
    }
    let data = JSON.parse(body);
    cb(err, data);
  });
}

function downloadAvatars(url, filePath) {
  request.get(url, function(err) {
    if (err) {
      throw err;
    }
  })
         .pipe(fs.createWriteStream(filePath));
}

module.exports = {
  getRepoContributors: getRepoContributors,
  downloadAvatars: downloadAvatars
};