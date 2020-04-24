var gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	browserSync = require("browser-sync").create(),
	sass = require("gulp-sass"),
	cleanCSS = require("gulp-clean-css"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	lineec = require("gulp-line-ending-corrector");

var root = "./",
	scss = root + "styles/scss/",
	cssFolder = root + "styles/css/";

var styleWatchFiles = root + "styles/scss/**/*.scss";

var cssSRC = root + "styles/css/main.css";

function css() {
	return gulp
		.src([scss + "main.scss"])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(
			sass({
				outputStyle: "expanded",
			}).on("error", sass.logError)
		)
		.pipe(autoprefixer("last 2 versions"))
		.pipe(sourcemaps.write())
		.pipe(lineec())
		.pipe(gulp.dest(cssFolder));
}

function concatCSS() {
	return gulp
		.src(cssSRC)
		.pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
		.pipe(concat("main.min.css"))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write("./maps/"))
		.pipe(lineec())
		.pipe(gulp.dest(cssFolder));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
	gulp.watch("./*.html").on("change", browserSync.reload);
	gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.watch = watch;

var build = gulp.parallel(watch);
gulp.task("default", build);
