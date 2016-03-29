var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');

var source = 'src';
var dest = 'dist';

gulp.task('clean', function (done) {
    del([dest], done);
});

gulp.task('copy-main', function () {
    return gulp.src(source + '/main/**/*.*')
        .pipe(gulp.dest(dest))
});

gulp.task('copy-pizza', function () {
    return gulp.src(source + '/pizza/**/*.*')
        .pipe(gulp.dest(dest + '/pizza/'))
});

gulp.task('default', ['copy-main', 'copy-pizza'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
