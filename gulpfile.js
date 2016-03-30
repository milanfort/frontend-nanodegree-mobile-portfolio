var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

var source = 'src';
var dest = 'dist';

gulp.task('clean', function (done) {
    del([dest], done);
});

gulp.task('copy-main', function () {
    return gulp.src([source + '/main/**/*.*', '!' + source + '/main/images/*.*'])
        .pipe(gulp.dest(dest))
});

gulp.task('copy-pizza', function () {
    return gulp.src(source + '/pizza/**/*.*')
        .pipe(gulp.dest(dest + '/pizza/'))
});

gulp.task('images', function () {
    return gulp.src(source + '/main/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(dest + '/images/'));
});

gulp.task('default', ['copy-main', 'copy-pizza', 'images'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
