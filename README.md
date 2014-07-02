# gulp-hologram

> Generate Hologram style guides with gulp

## Getting Started
This plugin requires gulp.

If you haven't used [gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](http://gulpjs.com/getting-started) guide, as it explains how to create a [gulpfile](http://gulpjs.com/sample-gulpfile) as well as install and use gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-hologram --save-dev
```

Once the plugin has been installed, it may be enabled inside your gulpfile with this line of JavaScript:

```js
gulp.loadNpmTasks('gulp-hologram');
```

## The "hologram" task

### Overview
In your project's gulpfile, add a section named `hologram` .

```js
ggulp.src('config.yml')
        .pipe(hologram());
```

### Options

#### options.logging
Type: `Boolian`
*Required*

The path to your hologram config file as source.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Rejah Rehim. Licensed under the MIT license.
