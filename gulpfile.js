const gulp = require("gulp");
const ts = require("gulp-typescript");
const webpack = require('webpack-stream');
const vueify = require('gulp-vueify');
const rimraf = require("gulp-rimraf");

const tsProject = ts.createProject('tsconfig.json');
const tsSrc = tsProject.src();

const vueSrc  = "./src/**/*.vue";
const htmlSrc = "./src/**/*.html";
const cssSrc  = "./src/**/*.css";

gulp.task('default', ['clean'], () => {
  return gulp.start('webpack', 'transpile-ts', 'move-html', 'move-css');
});

gulp.task('clean', () => {
  return gulp.src(['dist/'], { read: false })
  .pipe(rimraf());
});

gulp.task('transpile-ts', () => {
  return tsSrc
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("dist/"));
});

gulp.task('webpack', ['transpile-ts', 'move-html', 'move-css'], () => {
  return gulp.src("src/views/static/js/main.tsx")
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest("dist/views/static/js"))
});

gulp.task('move-html', () => {
  return gulp.src(htmlSrc)
  .pipe(gulp.dest('dist/'));
});

gulp.task('move-css', () => {
  return gulp.src(cssSrc)
  .pipe(gulp.dest('dist/'));
});
