const request = require('request');
const fs = require('fs');

const GITHUB_USER = 'GEDDE5';
const GITHUB_TOKEN = '4f8e924b6235e2548083b44e2d1ac748349498fc';
const USER_AGENT = GITHUB_USER;

function downloadImageByURL(url, filePath) {
  request.get(url, function(err) {
    if (err) {
      throw err;
    }
  })
         .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let options = {
    url: requestURL,
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

function cb(err, result) {
  result.forEach(r => {
    let avatarPath = 'avatars/' + r.login + '.jpg';
    downloadImageByURL(r.avatar_url, avatarPath);
  });
}

// Ensures user provides two arguments
if (process.argv.length !== 4) {
  throw 'Error: Two arguments required';
}
const owner = process.argv[2];
const repo = process.argv[3];

getRepoContributors(owner, repo, cb);


