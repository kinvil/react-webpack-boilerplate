'use strict';
var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    extender = require('gulp-html-extend'),
    minifyHTML = require('gulp-minify-html'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence');

gulp.task('wait', function (callback) {
    setTimeout(callback, 1500);
});

gulp.task('clean-dist', function () {
    gulp.src('dist/*', { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('minify-html', function () {
    gulp.src('src/index.html')
        .pipe(extender({ annotations: false, verbose: false }))
        .pipe(minifyHTML({ comments:false, spare:false, quotes:true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    gulp.src('src/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('develop', function (callback) {
    runSequence('clean-dist',
                'wait',
                ['minify-html', 'minify-css'],
                callback
    )
});
