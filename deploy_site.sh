#!/bin/bash
npm install
gulp build-app-prod
(cd dist.prod && tar -cvzf ../pages.tgz .)
git checkout gh-pages
rm -fr !(pages.tgz)
tar -xvzf pages.tgz
rm -fr pages.tgz
git add . -A
git commit -m "deploying new site"
git push --set-upstream origin gh-pages
