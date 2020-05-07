const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug')
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
});

gulp.task('pug', () => {
    return gulp.src('./views/**/*.pug')
        .pipe(pug())
        .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
        .pipe(gulp.dest('./src'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        watch: true,
        server: "./src"
    });
});

gulp.task('watch-sass', () => {
    return gulp.watch('./sass/*/*.scss').on('change', gulp.series('sass',function (done) {
        browserSync.reload();
        done();
      }));
});

gulp.task('watch-pug', () => {
    return gulp.watch('./views/**/*.pug').on('change', gulp.series('pug',  function (done) {
        browserSync.reload();
        done();
      }));
});

gulp.task('default', gulp.parallel('watch-pug', 'watch-sass', 'browser-sync'));

gulp.task('build', gulp.parallel('pug', 'sass'));