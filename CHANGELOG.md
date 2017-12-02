# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [0.2.0] - 2016-12-24
### Changed
- Changed fuzzy search provider to `fuse.js` for better matching
- Exact feature name matches must now suffixed with "!" to display support list
- Pressing enter on a search result autofills with "!" appended to show support list

### Fixed
- Update `alfred-notifier` dependency to remove need for workaround to improve speed


## [0.1.1] - 2016-11-19
### Fixed
- Partial support message


## [0.1.0] - 2017-11-19
### Added
- Find and filter features from caniuse.com
- See simplified support tables based on a browserslist config


[0.1.1]: https://github.com/robjtede/monux/compare/v0.0.1...v0.1.0
[0.1.0]: https://github.com/robjtede/monux/compare/4f9e08...v0.0.1
