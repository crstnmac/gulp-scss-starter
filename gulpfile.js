const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");

//complie scss into css
function style() {
	// 1 . Where is my scss file
	return (
		gulp
			.src("./styles/scss/**/*.scss")
			// 2. passs that file through sass compiler
			.pipe(
				sass({
					errLogToConsole: true,
					outputStyle: "compressed",
				}).on("error", sass.logError)
			)
			.pipe(rename({ suffix: ".min" }))
			// 3. where do I save the compiled css?
			.pipe(gulp.dest("./styles/css"))
			// 4. stream changes to all browser
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch("./styles/scss/**/*.scss", style);
	gulp.watch("./*.html").on("change", browserSync.reload);
	gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
