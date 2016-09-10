var browser_sync = require('browser-sync').create();
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var gulp = require('gulp')

function start_server() {
  browser_sync.init({
    server: {
      baseDir: "static"
    }
  })
}

function on_src_update() {
  browserify('./src/index.js').bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./static'))

  browser_sync.reload()
}

gulp.task('watch', () => {
  on_src_update()
  gulp.watch('src/*', on_src_update)
  start_server()
})
