#!/usr/bin/env node

var Splash = require('../lib/app.js');
var SplashOut = require('../lib/output.js');

var argv = require('minimist')(process.argv.slice(2));
var cwd = process.cwd();

var splash = new Splash(cwd, argv);
var splash_out = new SplashOut(cwd, argv);

switch (argv._[0]) {
  case 'watch':
    // watch files for change
    // on change run splash.build()
    // output build files to build dir
    console.log('SPLASH: watch');
    break;
  case 'serve':
    // setup server, run splash.build() and serve output
    // watch files for change
    // on change run splash.build() and reload
    console.log('SPLASH: serve');
    break;
  default:
    // build files once
    // output them to build dir
    splash_out.output(splash.build());
}