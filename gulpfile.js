var project = require('./package.json');
var del = require('del');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

var source = 'src';
var dest = 'dist';

gulp.task('clean', function (done) {
    del([dest], done);
});

gulp.task('copy-main', function () {
    return gulp.src([source + '/main/css/*.css'])
        .pipe(gulp.dest(dest + '/css'))
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

gulp.task('js', function () {
    return gulp.src(source + '/main/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dest + '/js/'));
});

gulp.task('html', function () {
    return gulp.src(source + '/main/*.html')
        //.pipe(htmlclean())
        .pipe(gulp.dest(dest))
});

gulp.task('default', ['copy-main', 'copy-pizza', 'images', 'js', 'html'], function () {
    console.log('Building %s version %s', project.name, project.version);
});
