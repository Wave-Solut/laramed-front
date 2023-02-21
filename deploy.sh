#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy on gh-pages'

git push -f git@github.com:Wave-Solut/laramed-front.git master:gh-pages

cd -