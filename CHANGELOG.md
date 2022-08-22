## Roadmap

* ~~replacing axios with Fetch API~~
* ~~complete rewrite of app to React 18 and Typescript~~
* ~~slimming down dependency tree (using pure React instead of create-react-app)~~
* ~~getting rid of mixins~~
* refactoring map context
* refactoring layers
* replacing dependencies that are no longer maintained (like leaflet-almostover) with custom solutions

## 2.4.0 - 22.08.2022

### Added

* webpack settings for splitting to chunks

### Changed

* excluded miragejs from production package

## 2.3.0 - 21.08.2022

### Added

* UI button component
* bundle analyzer

### Changed

* removed mixins

## 2.2.0 - 21.08.2022

### Added

* add aliases

## 2.1.0 - 20.08.2022

### Changed

* refactor document component
* minor naming changes

## 2.0.0 - 19.08.2022

### Changed

* completely dropped create-react-app boilerplate code/settings
* migrated to typescript and css modules
* migrated from class components to functional with hooks
* minor refactors/cleanups

* updated __react__ `16.14.0` -> `18.2.0`
* updated __react-app-polyfill__ `1.0.6` -> `3.0.0`
* updated __react-dom__ `16.14.0` -> `18.2.0`
* updated __react-ga__ `2.7.0` -> `3.3.1`
* updated __react-router-dom__ `5.2.0` -> `6.3.0`

## 1.7.0 - 11.08.2022

### Changed

* App, Map and Document components switched from class to function components with hooks
* updated About page content

## 1.6.0 - 09.08.2022

### Changed

* replaced __axios__ with Fetch API

## 1.5.0 - 09.08.2022

### Added

* completed dummy development api with missing endpoints

### Removed

* removed redundant elements (Message, Alerts)
* removed __react-transition-group__

## 1.4.0 - 08.08.2022

### Added

* added __miragejs__ `0.1.45`
* dev server with dummy data

### Changed

* remanaged packages in package.json
* turned off message popup
* updated __leaflet__ `1.7.0` -> `1.8.0`

## 1.3.0

### Changed

* moved styles to css modules
* removed duplicate button styles

## 1.2.0

### Changed

* ejected project

### Added

* added eslint configuration
* added prop-types library and proptypes to components

### Removed

* removed redundant font files
* removed redundant image file

### Fixed

* eslint errors fixed

## 1.1.2

### Changed

* updated __axios__ `0.19.0` -> `0.19.2`
* updated __leaflet__ `1.5.1` -> `1.6.0`
* updated __leaflet-geometryutil__ `0.9.1` -> `0.9.3`
* updated __react__ `16.8.6` -> `16.13.1`
* updated __react-app-polyfill__ `1.0.1` -> `1.0.6`
* updated __react-dom__ `16.8.6` -> `16.13.1`
* updated __react-ga__ `2.6.0` -> `2.7.0`
* updated __react-router-dom__ `5.0.1` -> `5.1.2`
* updated __react-scripts__ `3.0.1` -> `3.4.1`
* updated __react-transition-group__ `4.2.2` -> `4.3.0`

## 1.1.1

### Added

* `react-app-polyfill` dependency

### Fixed

* problem with app failing to run on IE11

## X.X.X

### Changed

* ...

### Added

* ...

### Removed

* ...

### Fixed

* ...
