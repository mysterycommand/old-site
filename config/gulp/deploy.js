import { exec } from 'child_process';
import path from 'path';
import glob from 'glob';

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

const steps = [{
    cmd: `git clone -qb master --single-branch ${url} deploy > /dev/null 2>&1`,
    opts: null,
},{
    cmd: `mkdir -p ${outDir}`,
    opts: null,
},{
    cmd: `git rm -r --ignore-unmatch ${glob.sync(`${outDir}/!(staging)`).join() || '?'}`,
    opts: null,
},{
    cmd: `cp -R ${publicDir}/* ${outDir}`,
    opts: null,
},{
    cmd: `git config user.name "Travis CI"`,
    opts: { cwd: deployDir },
},{
    cmd: `git config user.email "travis@travis-ci.org"`,
    opts: { cwd: deployDir },
},{
    cmd: `git config push.default simple`,
    opts: { cwd: deployDir },
},{
    cmd: `git add .`,
    opts: { cwd: deployDir },
},{
    cmd: `git commit --allow-empty -am "Travis buld #${TRAVIS_BUILD_NUMBER} - \`date +\"%D %T\"\` [ci skip]"`,
    opts: { cwd: deployDir },
},{
    cmd: `git push`,
    opts: { cwd: deployDir },
}];

export default () => {
    return steps.reduce((cmds, {cmd, opts}) => {
        return cmds.then(() => {
            return new Promise((resolve, reject) => {
                exec(cmd, opts, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(stdout);
                });
            });
        });
    }, Promise.resolve());
}
