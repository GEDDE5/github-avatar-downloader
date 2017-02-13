var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'GEDDE5';
var GITHUB_TOKEN = '4f8e924b6235e2548083b44e2d1ac748349498fc';
var USER_AGENT = GITHUB_USER;


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  let options = {
    url: requestURL,
    headers: { 'User-Agent': USER_AGENT }
  }

  request.get(options, function(err, response, body) {
    if (err) throw err;
    console.log(JSON.parse(body));
  });
}


// This doesn't work for some reason :()
//   request.get(options)
//     .on('error', function(err) {
//       throw err;
//     })
//     .on('response', function(response) {
//       console.log('Response status code:', response.statusCode);
//     })
//     .on('body', function(body) {
//       console.log(body);
//     });
//     .pipe(fs.createWriteStream('response.json'));

function cb(err, result) {
  console.log('Errors: ' + err);
  console.log('Result: ' + result);
}

getRepoContributors('nodejs', 'node', cb);