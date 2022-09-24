import gulp from 'gulp';
import dartSass from 'sass'
import gulpSass  from 'gulp-sass'
const sass = gulpSass(dartSass)
import sourcemaps  from 'gulp-sourcemaps';
import image from 'gulp-image';
import babel from 'gulp-babel'
import autoprefixer from 'gulp-autoprefixer'
import {create as bsCreate} from 'browser-sync';

const browserSync = bsCreate();

const pathJs = './assets/js/**/*'
const pathJsOut = './js'
const pathScss = './assets/scss/**/*.scss'
const pathScssOut = './css'
const pathImg = './assets/imgs/full_imgs/**/*'
const pathImgOut = './assets/imgs/optimize_imgs'
// import clean from 'gulp-clean-css'

gulp.task('buildSass', ()=>{
    return gulp.src(pathScss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false ,
            flexbox: true,
            grid: true,
            browsers: ['last 3 versions']
        }))
        // .pipe(clean())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathScssOut))
        // .pipe(browserSync.reload())
        .pipe(browserSync.stream())
});

gulp.task('img', ()=>{
    return gulp.src(pathImg)
        .pipe(image())
        .pipe(gulp.dest(pathImgOut))
});
gulp.task('buildJs', ()=>{
    return gulp.src(pathJs)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pathJsOut))
        .pipe(browserSync.stream())
});

gulp.task('serve',  ()=> {
    browserSync.init({
        server: {
            baseDir: "./",
            // proxy: 'https://localhost:3000',
            // https: true
        }
    });

    gulp.watch("./css/**/*.css", browserSync.reload);
    // gulp.watch("./js/**/*.js", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('watch', ()=>{
    gulp.watch(pathScss, gulp.series('buildSass'))
    // gulp.watch(pathImg, gulp.series('optimize_imgs'))
    gulp.watch(pathJs, gulp.series('buildJs'))
    gulp.watch(pathJs, gulp.series('serve'))
    gulp.watch(pathScss, gulp.series('serve'))
});

gulp.task('default', gulp.series('buildSass', 'buildJs'  ,'watch'))
gulp.task('serve' ,gulp.series('serve'))
gulp.task('img', gulp.series('img'))