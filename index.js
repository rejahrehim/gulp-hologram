/*
* gulp-hologram
*
*
* Copyright (c) 2014 Rejah Rehim
* Licensed under the MIT license.
*/

var which = require("which").sync,
  gutil = require("gulp-util"),
  path = require("path"),
  spawn = require("child_process").spawn,
  Stream = require("stream"),
  Duplexer = require("plexer"),
  PluginError = gutil.PluginError,
  log = gutil.log;

// Consts
var PLUGIN_NAME = "gulp-hologram";

function gulpHologram(opts) {
  "use strict";
  opts = opts || {};
  var args = [],
    stream = new Stream.PassThrough({objectMode: true}),
    hologramExecutable = "hologram";

  if (opts.bundler) {
    hologramExecutable = "bundle";
    args = ["exec", "hologram"];
    // check bundle command exist
    try {
      hologramExecutable = which(hologramExecutable);
    } catch (err) {
      throw new PluginError(PLUGIN_NAME,
        "\nYou need to have Bundler installed in your PATH for this task to work.\n" +
        "\nsudo gem install bundler\n"
        );
    }
  }
  // check Hologram command exist
  try {
    hologramExecutable = which(hologramExecutable);
  } catch (err) {
    throw new PluginError(PLUGIN_NAME,
      "\nYou need to have Hologram installed in your PATH for this task to work.\n" +
      "\nsudo gem install hologram\n"
      );
  }

  // Run hologram
  stream._transform = function (file, unused, cb) {

    // Null check config file path from source

    if (file.isNull()) {
      stream.push(file);
      return cb();
    } else {
      var ext = path.extname(file.path);

      if (opts.logging) {
        log("Config file extension:", ext);
      }

      //Passing config path of hologram to args
      args.push(file.path);

      if (ext !== ".yml") {
        throw new PluginError(PLUGIN_NAME,
          "\nYou must provide a path to your yml hologram config file as source.\n"
          );
      }
    }

    // spawn program
    if (opts.logging) {
      log("Running command:", hologramExecutable, args);
    }
    var program = spawn(hologramExecutable, args);

    // listen to stderr and emit errors if any
    var errBuffer = new Buffer(0);
    program.stderr.on("readable", function () {
      var chunk;
      while (chunk = program.stderr.read()) {
        errBuffer = Buffer.concat([
          errBuffer,
          chunk
        ], errBuffer.length + chunk.length);
      }
    });

    program.stderr.on("end", function () {
      if (errBuffer.length) {
        stream.emit("error", new PluginError(PLUGIN_NAME,
          errBuffer.toString("utf-8")));
      }
    });

    // check if we have a buffer or stream
    if (file.contents instanceof Buffer) {

      // create buffer
      var newBuffer = new Buffer(0);

      // when program receives data add it to buffer
      program.stdout.on("readable", function () {
        var chunk;
        while (chunk = program.stdout.read()) {
          newBuffer = Buffer.concat([
            newBuffer,
            chunk
          ], newBuffer.length + chunk.length);
        }
      });

      // when program finishes call callback
      program.stdout.on("end", function () {
        file.contents = newBuffer;
        stream.push(file);
        cb();
      });

      // "execute"
      // write file buffer to program
      program.stdin.write(file.contents, function () {
        program.stdin.end();
      });

    } else { // assume we have a stream.Readable

      // stream away!
      file.contents = file.contents
        .pipe(new Duplexer(program.stdin, program.stdout));

      stream.push(file);
      cb();
    }
  };
  return stream;
}

module.exports =  gulpHologram;
