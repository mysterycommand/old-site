#!/usr/bin/env node

const exec = require('child_process').exec;
// const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const glob = require('glob');

// const pub = path.resolve(__dirname, './public');
// fs.readdir(pub, (err, files) => {
//     console.log(files);
// });

const CLONE_URL = process.env.TRAVIS
    ? `https://${process.env.GH_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`
    : 'git@github.com:mysterycommand/mysterycommand.github.io.git';

function gitClone(url) {
    console.log('gitClone');
    return new Promise((resolve, reject) => {
        const cloneCmd = `git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`;

        exec(cloneCmd, null, (error, stdout, stderr) => {
            if (error) {
                console.log('gitClone:error', error);
                reject(error);
            }
            resolve(stdout);
        });
    });
}

function makeDeploy() {
    console.log('makeDeploy');
    const tpr = process.env.TRAVIS_PULL_REQUEST;
    console.log('TRAVIS_PULL_REQUEST:', tpr, tpr === 'false');
    const dir = tpr && tpr !== 'false'
        ? `./deploy/staging/${process.env.TRAVIS_PULL_REQUEST}`
        : './deploy';

    return new Promise((resolve, reject) => {
        mkdirp(dir, error => {
            if (error) {
                console.log('makeDeploy:error', error);
                reject(error);
            }
            resolve(dir);
        })
    });
}

function globFiles(dir) {
    console.log('globFiles');
    return new Promise((resolve, reject) => {
        glob(`${dir}/!(staging)`, (error, files) => {
            if (error) {
                console.log('globFiles:error', error);
                reject(error);
            }
            resolve(files);
        });
    });
}

function cleanDeploy(files) {
    console.log('cleanDeploy');
    if (!files.length) {
        return Promise.resolve();
    }

    files = files.map(file => path.relative('./deploy', file));

    return new Promise((resolve, reject) => {
        const rmCmd = `git rm -r --ignore-unmatch ${files.join(' ')}`;

        exec(rmCmd, { cwd: './deploy' }, (error, stdout, stderr) => {
            if (error) {
                console.log('cleanDeploy:error', error);
                reject(error);
            }
            resolve();
        });
    });
}

gitClone(CLONE_URL)
    .then(makeDeploy)
    .then(globFiles)
    .then(cleanDeploy)
    .catch(error => {
        console.log('error', error);
        process.exit(1);
    });
