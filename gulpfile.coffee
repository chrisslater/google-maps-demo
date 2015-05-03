# Vendor dependencies
gulp        = require('gulp')
gutil       = require('gulp-util')
source      = require('vinyl-source-stream')
watchify    = require('watchify')
browserify  = require('browserify')
reactify    = require('coffee-reactify')
livereload  = require('gulp-livereload')
ghPages     = require('gulp-gh-pages')
del         = require('del')

# Project dependencies
server      = require('./server')

entryFile = './app/app.js'
distPath = './public/js'
bundleName = 'bundle.js'

# Deploy settings.
distDeployPath = './dist'

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

gulp.task 'clean', (cb) ->
  del ['./dist/**/*'], cb

gulp.task 'prepareJs', () ->
  browserify(entryFile).bundle()
    .pipe source(bundleName)
    .pipe gulp.dest(distDeployPath + '/js')

gulp.task 'prepareViews', () ->
  gulp.src(['./views/*'])
    .pipe(gulp.dest(distDeployPath))

gulp.task 'deploy', ['clean', 'prepareViews', 'prepareJs'], () ->
  gulp.src('./dist/**/*')
    .pipe(ghPages())
