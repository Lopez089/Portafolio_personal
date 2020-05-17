const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const minify = require("gulp-minify");

gulp.task("pug", () => {
  gulp
    .src("./src/layaut/index.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("sass", () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src(["./src/js/cont.js"])
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
      })
    )
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
});

gulp.task("serve", ["sass", "js"], () => {
  browserSync.init({
    server: "./public",
  });

  gulp.watch(
    ["./src/js/*.js", "./src/scss/*.scss", "./src/layaut/*.pug"],
    ["sass", "pug"]
  );

  gulp.watch(["src/*"]).on("change", browserSync.reload);
});

gulp.task("default", ["js", "sass", "pug", "serve"]);
