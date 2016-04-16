#!/usr/bin/env node

const exec = require('child_process').exec;
const fs = require('fs');
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
const DEPLOY_DIR = './deploy';
const PUBLIC_DIR = './public';

const tpr = process.env.TRAVIS_PULL_REQUEST;
console.log('TRAVIS_PULL_REQUEST:', tpr, tpr === 'false');
const dir = tpr && tpr !== 'false'
    ? `${DEPLOY_DIR}/staging/${process.env.TRAVIS_PULL_REQUEST}`
    : `${DEPLOY_DIR}`;

function gitClone() {
    console.log('gitClone');
    return new Promise((resolve, reject) => {
        const cloneCmd = `git clone -qb master --single-branch ${CLONE_URL} ${DEPLOY_DIR} > /dev/null 2>&1`;

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

function globDeploy(dir) {
    console.log('globDeploy');
    return new Promise((resolve, reject) => {
        glob(`${dir}/!(staging)`, (error, files) => {
            if (error) {
                console.log('globDeploy:error', error);
                reject(error);
            }
            resolve(files);
        });
    });
}

function cleanDeploy(files) {
    console.log('cleanDeploy');
    if (!files.length) {
        return Promise.resolve(`${PUBLIC_DIR}`);
    }

    files = files.map(file => path.relative(`${DEPLOY_DIR}`, file));

    return new Promise((resolve, reject) => {
        const rmCmd = `git rm -r --ignore-unmatch ${files.join(' ')}`;

        exec(rmCmd, { cwd: `${DEPLOY_DIR}` }, (error, stdout, stderr) => {
            if (error) {
                console.log('cleanDeploy:error', error);
                reject(error);
            }
            resolve(`${PUBLIC_DIR}`);
        });
    });
}

function globPublic(dir) {
    console.log('globPublic');
    return new Promise((resolve, reject) => {
        glob(`${dir}/*`, (error, files) => {
            if (error) {
                console.log('globPublic:error', error);
                reject(error);
            }
            resolve(files);
        });
    });
}

function copyPublic(files) {
    console.log('copyPublic');
    console.log(files);
    return Promise.resolve();
    // return Promise.all(files.map((file) => {
    //     return new Promise((resolve, reject) => {
    //         fs.createReadStream(file)
    //             .pipe(fs.createWriteStream())
    //     })
    // }));
}

gitClone()
    .then(makeDeploy)
    .then(globDeploy)
    .then(cleanDeploy)
    .then(globPublic)
    .then(copyPublic)
    .catch(error => {
        console.log('error', error);
        process.exit(1);
    });
