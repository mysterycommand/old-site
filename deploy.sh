#!/bin/bash
set -e

rm -rf deploy || exit 0;

git clone --quiet --branch=master --single-branch "https://${GH_TOKEN}@${GH_REPOSITORY}" deploy > /dev/null 2>&1
cd deploy

git rm -r .
cp -R ../public/* .

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"
git config push.default simple

git add .
git commit --allow-empty -am "Travis buld #${TRAVIS_BUILD_NUMBER} - `date +\"%D %T\"` [ci skip]"
git push
