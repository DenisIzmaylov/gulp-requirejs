var gutil       = require('gulp-util'),
    requirejs   = require('requirejs'),
    PluginError = gutil.PluginError,
    defaults    = require('lodash.defaults'),
    through2    = require('through2');

// Consts
const PLUGIN_NAME = 'gulp-requirejs';


module.exports = function(options) {

    'use strict';

    if (!opts) {
        throw new PluginError(PLUGIN_NAME, 'Missing options array!');
    }

    if (opts.out) {
        throw new PluginError(PLUGIN_NAME, 'Custom file outputs are not supported!');
    }

    if (!opts.baseUrl) {
        throw new PluginError(PLUGIN_NAME, 'Please specify the base path for your scripts to connect dependencies.');
    }

    return through2.obj(function (file, enc, cb) {

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }


        // copy `options` with apply defaults
        var opts = defaults(options, {
            path: {}
        });

        opts.out = function (text) {

            file.contents = new Buffer(text);

            cb(null, file);
        };


        requirejs.optimize(opts);
    });
}