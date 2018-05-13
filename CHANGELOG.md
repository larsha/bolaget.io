# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

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
