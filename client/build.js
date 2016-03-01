#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';

const fs = require('fs');
const path = require('path');
const program = require('commander');
const browserify = require('browserify');
const watchify = require('watchify');
const minimatch = require('minimatch');

/**
 * JFHC'd Build Parameters
 */
const externalDeps = [
  'react',
  'react-dom'
];

const outputFolder = `${__dirname}/build`;
const externalFile = path.join(outputFolder, 'external_bundle.js');
const appFile = path.join(outputFolder, 'bundle.js');
const appEntry = `${__dirname}/components/app.jsx`;
const watchglob = `${__dirname}/**/*.js*`;
/**
 **/

program
  .option('-o, --one-bundle', 'Create one consolidated bundle')
  .option('-f, --full-paths', 'Use full paths (DEV ONLY!) helps in debugging')
  .option('-a, --app-only', 'Only build the APP bundle (no external), this is ignored if --one-bundle is on')
  .option('-w, --watch', 'start the watcher for the APP bundle')
  .parse(process.argv);

function createExternalBundle() {
  const startTime = Date.now();
  console.log('Building External APP bundle');

  return browserify({
    debug: false,
    require: externalDeps
  }).bundle()
    .on('end', () => {
      console.log(`External APP bundle complete [${Date.now() - startTime} ms]`);
    })
    .pipe(fs.createWriteStream(externalFile, { defaultEncoding: 'utf8' }));
}

function createAppBundle(fullPaths, skipExternal, watch) {
  let bundler = browserify({
    debug: true,
    transform: ['babelify'],
    entries: [appEntry],
    cache: {},
    packageCache: {},
    fullPaths
  });

  if (skipExternal) {
    externalDeps.forEach((dep) => {
      bundler.external(dep);
    });
  }

  function bundle(silent) {
    const startTime = Date.now();
    if (!silent) {
      console.log('Building APP bundle');
    }

    const b = bundler.bundle();
    if (!silent) {
      b.on('end', () => {
        console.log(`APP bundle complete [${Date.now() - startTime} ms]`);
      });
      b.on('error', console.log.bind(console));

    }
    return b.pipe(fs.createWriteStream(appFile, { defaultEncoding: 'utf8' }));
  }

  if (watch) {
    console.log(`> Watching ${watchglob}`);
    bundler = watchify(bundler);
    bundler.on('log', console.log.bind(console));
    bundler.on('error', console.log.bind(console));
    bundler.on('update', (files) => {
      files = files.filter((file) => minimatch(file, watchglob));
      if (files.length) {
        console.log('Updating for changes in', files);
        bundle(true);
      }
    });

  }

  return bundle();

}

if (program.oneBundle) {
  createAppBundle(program.fullPaths, false, program.watch);
} else {
  createAppBundle(program.fullPaths, true, program.watch);
  if (!program.appOnly) {
    createExternalBundle();
  }
}