#gulp-hologram

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

> Generate Hologram style guides with gulp

## Getting Started
This plugin requires gulp.

If you haven't used [gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) guide, as it explains how to create a [gulpfile](https://github.com/gulpjs/gulp/blob/master/README.md#sample-gulpfilejs) as well as install and use gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-hologram --save-dev
```

Once the plugin has been installed, it may be enabled inside your gulpfile with this line of JavaScript:

```js
var hologram = require('gulp-hologram');
```

## The "hologram" task

### Overview
In your project's gulpfile, add a section named `hologram` .
The path to your hologram config file as source.

```js
gulp.task('hologram', function() {
        gulp.src('config.yml')
                .pipe(hologram());
});
```

### Options

#### options.logging
Type: `Boolean`
Set `logging: true` to enable Logging.


```js
gulp.task('hologram', function() {
        gulp.src('config.yml')
                .pipe(hologram({logging:true}));
});
```

#### options.bundler
Type: 'Boolean'
Set `bundler: true` to invoke `hologram` via bundler.

```js
gulp.task('hologram', function() {
        gulp.src('config.yml')
                .pipe(hologram({bundler:true, logging:true}));
});
```

## Contributing
Take care to maintain the existing coding style. [gulp](http://gulpjs.com/).

## TO DO
 -Add unit tests
## Release History
 - 1.2.0 (Fixed Bugs)
 - 1.1.0 (Added support for Bundler)
 - 1.0.0 (First release)

## License
Copyright (c) 2014 Rejah Rehim. Licensed under the MIT license.

[downloads-image]: http://img.shields.io/npm/dm/gulp-hologram.svg
[npm-url]: https://npmjs.org/package/gulp-hologram
[npm-image]: http://img.shields.io/npm/v/gulp-hologram.svg
