import gulp from 'gulp';

import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import minify from 'gulp-minify';
import imagemin from 'gulp-imagemin';
import ghPages from 'gulp-gh-pages';
import clean  from 'gulp-clean';


gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
    return gulp.src('src/styles/style.scss')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ remove: false }) ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/script.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('libs', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('images', function () {
    return gulp.src('public/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images/'));
});

gulp.task('fonts', function () {
    return gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('dist/public/fonts/'));
});

gulp.task('watch', function () {
    gulp.watch('index.html', gulp.series('html'));
    gulp.watch('public/images/**/*', gulp.series('images'));
    gulp.watch('public/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('src/js/*.js', gulp.series('js'));
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('srcData', gulp.series('styles', 'js', 'html', 'libs'));

gulp.task('staticData', gulp.series('images', 'fonts'));

gulp.task('default', gulp.series('clean', 'srcData', 'staticData', 'watch'));