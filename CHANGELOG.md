# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [1.8.5] - 2019-12-08
### Changed
- Bumping deps
- Bumping Node.js to `13.3.0`

## [1.8.4] - 2019-11-24
### Changed
- Bumping deps

## [1.8.3] - 2019-11-21
### Changed
- Bumping Node.js to `13.1.0`
- Bumping Nginx to `1.17.6`
- Using `@babel/plugin-proposal-optional-chaining`

## [1.8.2] - 2019-10-24
### Changed
- Bumping Node.js to `13.0.1`
- Bumping Nginx to `1.17.5`

## [1.8.1] - 2019-10-20
### Changed
- Bumping Node.js to `12.12.0`

## [1.8.0] - 2019-10-05
### Changed
- Upgrading Elasticsearch service to `7.4.0`
- Bumping Node.js to `12.11.0`
- Bumping Nginx to `1.17.4`

## [1.7.11] - 2019-09-21
### Changed
- Replacing deprecated lib `elasticsearch` with new `@elastic/elasticsearch`
    - Minor refactoring due to above change
- Better Dockerfile for web

## [1.7.10] - 2019-09-21
### Changed
- Bumping Node.js to `12.10.0`
- Bumping deps

## [1.7.9] - 2019-08-30
### Changed
- Bumping Node.js to `12.9.1`
- Bumping deps

## [1.7.8] - 2019-08-16
### Changed
- Bumping Node.js to `12.8.1`
- Bumping Nginx to `1.17.3` (http://nginx.org/en/security_advisories.html)

## [1.7.7] - 2019-06-25
### Changed
- Upgrading from Elasticsearch `6.1.2` to `7.2.0`

## [1.7.6] - 2019-06-15
### Changed
- Updated cert-manager in cluster and adjusting resources accordingly.

## [1.7.5] - 2019-06-06
### Changed
- Bumping Node.js to `12.4.0`
- Bumping Nginx to `1.17.0`
- Solving security vulnerabilities in deps
- Bumping deps:
  - `@babel/cli` from `7.4.3` to `7.4.4`
  - `@babel/core` from `7.4.3` to `7.4.5`
  - `@babel/node` from `7.2.2` to `7.4.5`
  - `@babel/plugin-transform-modules-commonjs` from `7.4.3` to `7.4.4`  
  - `@babel/preset-env` from `7.4.3` to `7.4.5`  
  - `@babel/register` from `7.4.0` to `7.4.4`  
  - `babel-jest` from `24.7.1` to `24.8.0`  
  - `jest` from `24.7.1` to `24.8.0`  
  - `es6-promise` from `4.2.6` to `4.2.8`  
  - `http-shutdown` from `1.2.0` to `1.2.1`  
  - `husky` from `1.3.1` to `2.4.0`  
  - `lint-staged` from `8.1.5` to `8.2.0`  
  - `nodemon` from `1.18.11` to `1.19.1`  

## [1.7.4] - 2019-04-21
### Changed
- Bumping deps
- Solving security vulnerabilities in deps

## [1.7.3] - 2019-04-20
### Changed
- Allowing single product query with `nr` or `article_nr`, solving issue [#11](https://github.com/larsha/bolaget.io/issues/11).
- Bumping Node.js to `11.14.0`
- Bumping Nginx to `1.15.12`

## [1.7.2] - 2019-01-27
### Changed
- Fixed `worker.js` error handling
- Bumping Node.js to `11.8.0`
- Bumping Nginx to `1.15.8`

## [1.7.1] - 2018-12-14
### Changed
- Bumping Node.js to 11.4.0
- Bumping Nginx to 1.15.7
- Bumping `nodemon` from `1.18.4` to `1.18.9` to fix security vulnerabilities

## [1.7.0] - 2018-10-31
### Changed
- Bumping Node.js to 10.12.0
- Bumping Nginx to 1.15.5
- Upgrade to new Kubernetes cluster in `europe-north1` with `helm` deploy flow.

## [1.6.13] - 2018-09-28
### Changed
- Bumping Node.js to 10.11.0
- Bumping Nginx to 1.15.4
- Bumping deps:
  - `@babel/cli`, `@babel/core`, `@babel/plugin-transform-modules-commonjs`, `@babel/preset-env` from `7.0.0-rc.1` to `7.1.0`
  - `@babel/node`, `@babel/register` from `7.0.0-rc.1` to `7.0.0`
  - `babel-jest` from `23.4.2` to `23.6.0` 
  - `es6-promise` from `4.2.4` to `4.2.5` 
  - `handlebars` from `4.0.11` to `4.0.12` 
  - `husky` from `1.0.0-rc.13` to `1.0.1` 
  - `jest` from `23.5.0` to `23.6.0` 
  - `lint-staged` from `7.2.0` to `7.3.0` 
  - `nock` from `9.6.0` to `10.0.0` 
  - `nodemon` from `1.18.3` to `1.18.4` 
  - `koa` from `2.5.2` to `2.5.3` 
  - `standard` from `11.0.1` to `12.0.1` 

## [1.6.12] - 2018-08-10
### Changed
- Bumping Node.js to 10.8.0
- Bumping deps:
  - `@babel/cli`, `@babel/core`, `@babel/node`, `@babel/plugin-transform-modules-commonjs`, `@babel/preset-env`, `@babel/register` from `7.0.0-beta.52` to `7.0.0-rc.1`
  - `babel-jest` from `23.4.0` to `23.4.2` 
  - `jest` from `23.4.0` to `23.5.0` 
  - `lint-staged` from `6.1.0` to `7.2.0` 
  - `nock` from `9.4.2` to `9.6.0` 
  - `nodemon` from `1.18.0` to `1.18.3` 
  - `koa` from `2.5.1` to `2.5.2` 

## [1.6.11] - 2018-07-24
### Changed
- Bumping Node.js to 10.7.0
- Bumping Nginx to 1.15.2

## [1.6.10] - 2018-07-10
### Changed
- Bumping Node.js to 10.6.0
- Bumping Nginx to 1.15.1
- Bumping deps:
  - `elasticsearch` from `14.0.0` to `15.1.1`
  - `koa` from `2.4.1` to `2.5.1`
  - `koa-logger` from `3.1.0` to `3.2.0`
  - `koa-views` from `5.0.2` to `6.1.4`

## [1.6.9] - 2018-06-18
### Changed
- Bumping Node.js to 10.4.1
- Changing to `npm ci`

## [1.6.8] - 2018-06-07
### Changed
- Bumping Node.js to 10.4.0
- Bumping Nginx to 1.15.0

## [1.6.7] - 2018-05-13
### Changed
- Fixing README to show correct response data not found for `/stores` and `/products`
- Changed logging strategy for errors

## [1.6.6] - 2018-05-11
### Changed
- Fixing bug/miss with 404 not showing on products/stores routes as the README says is should

## [1.6.5] - 2018-05-11
### Changed
- Bumping Node.js to 10.1.0
- Bumping Nginx to 1.14.0

## [1.6.4] - 2018-03-29
### Changed
- Bumping Node.js to 9.10.0
- Bumping Nginx to 1.13.10

## [1.6.3] - 2018-03-18
### Changed
- Bumping Node.js to 9.8.0
- Nginx config - security update with proper redirect and HSTS header

## [1.6.2] - 2018-03-07
### Changed
- Bumping Node.js to 9.7.1

## [1.6.1] - 2018-03-02
### Changed
- Bumping Nginx to 1.13.9
- Adding own health check port for nginx

## [1.6.0] - 2018-02-11
### Changed
- Bumping Node.js to 9.5.0
- Bumping Nginx to 1.13.8
- Changed from ElasticSearch 2.4.6 to 6.1.2
- Changed ElasticSearch from k8s Deployment to a StatefulSet
- Refactored/rewrote parts of code base mainly due to ElasticSearch upgrade
- Changed file structure
- Changed test lib/assertion from Mocha/Chai to Jest

### Removed
- Coveralls.io

## [1.5.5] - 2018-01-10
### Changed
- Bumping Node.js to 9.3.0

## [1.5.4] - 2017-12-11
### Changed
- Bumping Node.js to 9.2.1
- Bumping Nginx to 1.13.7
- Changed Babel to new mono repo versions
- Adding `CONTRIBUTING.md`

## [1.5.3] - 2017-10-07
### Changed
- Bumping Node.js to 8.6.0
- Bumping Nginx to 1.13.5

## [1.5.2] - 2017-09-22
### Changed
- Bumping Node.js to 8.5.0

## [1.5.1] - 2017-09-09
### Changed
- Bumping Node.js to 8.4.0
- Fixing Coveralls

## [1.5.0] - 2017-07-19
### Added
- New functionality based on https://github.com/larsha/bolaget.io/pull/6
- Added this `CHANGELOG.md`
