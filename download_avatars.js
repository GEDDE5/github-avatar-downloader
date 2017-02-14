const contributors = require('./lib/contributors_api');

console.log('------------------------------------------');
console.log('| Welcome to the GitHub Avatar Downloader |');
console.log('------------------------------------------');

if (process.argv.length !== 4) {
  throw 'Error: Two arguments required';
}
const owner = process.argv[2];
const repo = process.argv[3];

contributors.getRepoContributors(owner, repo, (err, contribs) => {
  if (err) {
    throw err;
  }
  if (contribs.message === 'Not Found') {
    throw 'The provided owner/repo does not exist';
  } else {
    contribs.forEach(c => {
      let avatarPath = 'avatars/' + c.login + '.jpg';
      contributors.downloadAvatars(c.avatar_url, avatarPath);
    });
  }
});