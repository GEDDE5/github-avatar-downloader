const contributors = require('./lib/contributors_api');
const fs = require('fs');

if(!fs.existsSync('./.env')) {
  throw '.env file could not be found'
}

console.log('------------------------------------------');
console.log('| Welcome to the GitHub Avatar Downloader |');
console.log('------------------------------------------');

if (process.argv.length !== 4) {
  throw 'Error: Two arguments required';
}
const owner = process.argv[2];
const repo = process.argv[3];
const DEST_PATH = './avatars';

contributors.getRepoContributors(owner, repo, (err, contribs) => {
  if (err) {
    throw err;
  }
  if (!fs.existsSync(DEST_PATH)) {
    console.log('=> Created directory:', DEST_PATH);
    fs.mkdirSync(DEST_PATH);
  }
  if (contribs.message === 'Not Found') {
    throw 'The provided owner/repo does not exist; please try again.';
  }
  if (contribs.message === 'Bad credentials') {
    throw 'Error: bad credentials';
  }
  contribs.forEach(c => {
    let avatarPath = 'avatars/' + c.login + '.jpg';
    contributors.downloadAvatars(c.avatar_url, avatarPath);
  });
});