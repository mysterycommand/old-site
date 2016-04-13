#!/usr/bin/env node

const exec = require('child_process').exec;
// const fs = require('fs');
// const path = require('path');

const mkdirp = require('mkdirp');

// const pub = path.resolve(__dirname, './public');
// fs.readdir(pub, (err, files) => {
//     console.log(files);
// });

const clone = new Promise((resolve, reject) => {
    const url = process.env.TRAVIS
        ? `https://${process.env.GH_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`
        : 'git@github.com:mysterycommand/mysterycommand.github.io.git';

    const cmd = `git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`;

    exec(cmd, null, (error, stdout, stderr) => {
        if (error) {
            console.log('clone:error', error);
            reject(error);
        }

        console.log('stderr', stderr);
        console.log('stdout', stdout);
        resolve(stdout);
    });
});

const tpr = process.env.TRAVIS_PULL_REQUEST;
console.log('TRAVIS_PULL_REQUEST:', tpr, tpr === 'false');
const dir = tpr && tpr !== 'false'
    ? `./deploy/staging/${process.env.TRAVIS_PULL_REQUEST}`
    : './deploy';

const mkdir = new Promise((resolve, reject) => {
    mkdirp(dir, error => {
        if (error) {
            console.log('mkdir:error', error);
            reject(error);
        }
        resolve();
    })
});

Promise.all([
    clone,
    mkdir,
]).then(stdout => {
    console.log('stdout', stdout);
})
.catch(error => {
    console.log('error', error);
    process.exit(1);
});
