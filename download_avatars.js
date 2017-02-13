var request = require('request');

var GITHUB_USER = 'GEDDE5';
var GITHUB_TOKEN = '4f8e924b6235e2548083b44e2d1ac748349498fc';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  console.log(requestURL);
}

function cb(err, result) {
  console.log('Errors: ' + err);
  console.log('Result: ' + result);
}

getRepoContributors('nodejs', 'node', cb);