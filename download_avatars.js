var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'GEDDE5';
var GITHUB_TOKEN = '4f8e924b6235e2548083b44e2d1ac748349498fc';
var USER_AGENT = GITHUB_USER;

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      console.log('Download of ' + filePath + ' complete');
    });
}

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  let options = {
    url: requestURL,
    headers: { 'User-Agent': USER_AGENT }
  }

  request.get(options, function(err, response, body) {
    if (err) throw err;
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
  throw 'Error: Two arguments required: node download_avatars.js <repo owner> <repo name>';
} else {
  var owner = process.argv[2];
  var repo = process.argv[3];
}

getRepoContributors(owner, repo, cb);


