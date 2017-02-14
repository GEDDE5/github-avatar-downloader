const request = require('request');
const fs = require('fs');
require('dotenv').config();

const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USER_AGENT = GITHUB_USER;
const AVATAR_DIR = './avatars';

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
    console.log('\n=> Found GitHub data');
    cb(err, data);
  });
}

function downloadAvatars(url, filePath) {
  request.get(url, function(err) {
    if (err) {
      throw err;
    }
  })
         .pipe(fs.createWriteStream(filePath))
         .on('finish', function() {
           console.log('==> Downloaded:', filePath);
         });
}

module.exports = {
  getRepoContributors: getRepoContributors,
  downloadAvatars: downloadAvatars
};