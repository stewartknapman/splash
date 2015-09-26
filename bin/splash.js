#!/usr/bin/env node

var fs      = require('fs');
var chalk   = require('chalk');
var chokidar = require('chokidar');
var u       = require('../lib/utils');
var Splash  = require('../lib/app.js');

var argv    = require('minimist')(process.argv.slice(2));
var cwd     = process.cwd();
var options = {
  data_dir:     (argv.d || argv.data || 'data'),
  output_dir:   (argv.o || argv.output || 'build'),
  include_dir:  (argv.i || argv.includes || 'includes'),
  template_dir: (argv.t || argv.templates || 'templates')
};

var splash  = new Splash(cwd, options);

function build_and_output () {
  u.log(chalk.blue('Building files.'));
  var build = splash.build();
  u.log(chalk.blue('Outputting built files.'));
  splash.output(build);
  u.log(chalk.green('Done.'));
}

switch (argv._[0]) {
  case 'watch':
    // Note: Only watch files needed for liquid i.e. templates/*, includes/*, data/*
    u.log(chalk.blue('Starting splash watch: '), chalk.magenta(cwd));
    
    var watch_files = [
      options.template_dir,
      options.include_dir,
      options.data_dir
    ];
    
    chokidar.watch(watch_files, {
      persistent: true,
      cwd: '.'
    }).on('change', function (path) {
      u.log(chalk.blue('File changed: '), chalk.magenta(path));
      build_and_output();
    });
    break;
    
  case 'serve':
    // TODO:
    // setup server, run splash.build() and serve output
    // watch files for change
    // on change run splash.build() and reload
    u.log(chalk.red('SPLASH TODO: serve'));
    break;
    
  case 'generate':
    // TODO:
    // create dirs,
    // add a config file to check against for custom naming of dirs
    u.log(chalk.red('SPLASH TODO: generate'));
    break;
    
  default:
    u.log(chalk.blue('Starting splash build: '), chalk.magenta(cwd));
    build_and_output();
}