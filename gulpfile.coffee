# Vendor dependencies
gulp        = require('gulp')
gutil       = require('gulp-util')
source      = require('vinyl-source-stream')
watchify    = require('watchify')
browserify  = require('browserify')
reactify    = require('coffee-reactify')
livereload  = require('gulp-livereload')

# Project dependencies
server      = require('./server')

entryFile = './app/app.coffee'
distPath = './public/js'
bundleName = 'bundle.js'

bundler = watchify browserify(entryFile, watchify.args)
bundler.transform(reactify)

bundle = () ->
  bundler.bundle()
    .on 'error', (err) ->
      gutil.log(err.message)
      @.emit('end')

    .pipe source(bundleName)
    .pipe gulp.dest(distPath)
    .pipe(livereload())

bundler.on('update', bundle)
bundler.on 'log', (msg) ->
  gutil.log msg

gulp.task 'develop', ['server'], () ->
  bundle()

gulp.task 'server', () ->
  server.start()
