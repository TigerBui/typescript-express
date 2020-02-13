const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");

sass.compiler = require('node-sass');

const paths = {
	srcJS: 'views/directives/*.js',
	npmModule: 'npmmd/@tigerbui/immenu',
	scssPath: 'views/assets/scss/*.scss',
	cssPath: 'views/assets/css/*.css'
};

// BrowserSync
function browserSync() {
	browsersync.init({
		proxy: {
			target: 'http://localhost:3002/',
			ws: true
		},
		port: 8787
	});
}


function clean() {
	return del(["views/assets/**/*.css"]);
}

function ngPackage() {
	return gulp.src(paths.srcJS)
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('immenu.directive.min.js'))
		.pipe(uglify().on('error', function(e){
			console.log(e);
		}))
		.pipe(gulp.dest(paths.npmModule));
}

function sassCss() {
	return gulp.src(paths.scssPath)
		.pipe(sourcemaps.init())
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('views/assets/css/'));
}

function watchFiles() {
	gulp.watch(paths.scssPath, sassCss);
	browsersync.watch('views/').on('change', browsersync.reload);
}

const npmpk = gulp.parallel(ngPackage);
const build = gulp.series(clean, gulp.parallel(sassCss));
const watch = gulp.parallel(watchFiles, browserSync);

exports.npmpk = npmpk;
exports.build = build;
exports.watch = watch;
