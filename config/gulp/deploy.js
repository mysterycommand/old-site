import { exec } from 'child_process';
import path from 'path';

import glob from 'glob';
import gulp from 'gulp';
import mkdirp from 'mkdirp';

const {
    GH_REPO,
    GH_TOKEN,
    TRAVIS,
    TRAVIS_BUILD_NUMBER,
    TRAVIS_PULL_REQUEST,
    TRAVIS_REPO_SLUG,
} = process.env;

const url = TRAVIS
    ? `https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}`
    : 'git@github.com:mysterycommand/mysterycommand.github.io.git';

const cwd = process.cwd();
const deployDir = path.resolve(cwd, './deploy');
const publicDir = path.resolve(cwd, './public');

const isPr = TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== 'false';
const outDir = isPr
    ? `${deployDir}/staging/${TRAVIS_PULL_REQUEST}`
    : `${deployDir}`;

// function gitClone(url) {
//     return new Promise((resolve, reject) => {
//         exec(`git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`, null, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//             }
//             console.log(`git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`);
//             resolve(stdout);
//         });
//     });
// }

// function makeOutDir() {
//     return new Promise((resolve, reject) => {
//         mkdirp(outDir, (error) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve();
//         });
//     });
// }

// function globOldFiles() {
//     return new Promise((resolve, reject) => {
//         glob(`${outDir}/!(staging)`, null, (error, matches) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(matches.join(' '));
//         });
//     });
// }

// function gitRmOldFiles(files) {
//     if (!files) {
//         return Promise.resolve();
//     }

//     return new Promise((resolve, reject) => {
//         exec(`git rm -r --ignore-unmatch ${files}`, { cwd: deployDir }, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//             }
//             console.log(`git rm -r --ignore-unmatch ${files}`);
//             resolve(stdout);
//         });
//     });
// }

// function copyPublic() {
//     return new Promise((resolve, reject) => {
//         exec(`cp -R ${publicDir}/* ${outDir}`, null, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//             }
//             console.log(`cp -R ${publicDir}/* ${outDir}`);
//             resolve(stdout);
//         });
//     });
// }

export default () => {
    return [
        `git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`,
        `cd deploy`,

        `mkdir -p ${outDir}`,
        `git rm -r --ignore-unmatch ${glob.sync(`${outDir}/!(staging)`).join() || '+'}`,
        `cp -R ${publicDir}/* ${outDir}`,

        `git config user.name "Travis CI"`,
        `git config user.email "travis@travis-ci.org"`,
        `git config push.default simple`,

        `git add .`,
        `git commit --allow-empty -am "Travis buld #${TRAVIS_BUILD_NUMBER} - \`date +\"%D %T\"\` [ci skip]"`,
        `git push`,
    ].reduce((commands, command) => {
        return commands.then(() => {
            return new Promise((resolve, reject) => {
                exec(command, null, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    console.log(command);
                    resolve(stdout);
                });
            });
        });
    }, Promise.resolve());
}
