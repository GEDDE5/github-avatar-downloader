const contributors = require('./lib/contributors_api');

if (process.argv.length !== 4) {
  throw 'Error: Two arguments required';
}
const owner = process.argv[2];
const repo = process.argv[3];

contributors.getRepoContributors(owner, repo, (err, contribs) => {
  if (err) {
    throw err;
  }
  contribs.forEach(c => {
    let avatarPath = 'avatars/' + c.login + '.jpg';
    contributors.downloadAvatars(c.avatar_url, avatarPath);
  });
});