
var gulp = require("gulp");
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var minifyHTML = require("gulp-minify-html");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var newer = require("gulp-newer");
var gulpif = require("gulp-if");
var eventStream = require("event-stream");
var html2js = require("gulp-ng-html2js");
var replace = require("gulp-replace");
var path = require("path");
var jshint = require("gulp-jshint");
var csslint = require("gulp-csslint");
var $ = require('gulp-load-plugins')();
 
var srcSass = ["component/src/**/*.css"];
var srcJs = [
    "component/src/**/*.module.js",
    "component/src/**/*.js",
    "component/src/**/*.html"
];
var demoHtml = "component/demo/index.html";
var demoJs = [
    "component/demo/*.js"
];

var distDirectory = "dist";
var demoDirectory = distDirectory + "/demo/";
var srcImgDirectory = ["component/src/images/*"];

var demoHtml = "component/demo/index.html";

var vendorSrcJs = [
	"node_modules/angular/angular.min.js",
	"node_modules/jquery/dist/jquery.min.js",
    "node_modules/d3/d3.min.js",
     "node_modules/underscore/underscore-min.js"
];

var vendorSrcCss = [
    	"node_modules/bootstrap/dist/css/bootstrap.min.css"
];
 
gulp.task("default", ["build"]);

gulp.task("watch",  function() {
	gulp.watch(demoHtml, ["html"]);
	gulp.watch(srcSass, ["sass"]);
	gulp.watch([srcJs, demoJs], ["js"]);
});
//
 gulp.task("build", ["html", "sass", "js", "img", "vendor","server",'watch']);
//gulp.task("build", ["html","server",'watch']);
gulp.task("clean", function() {
	return gulp.src(demoDirectory, { read: false })
		.pipe(clean());
});

gulp.task('html', function() {
  return gulp.src(demoHtml)
    .pipe(minifyHTML({empty: true, spare: true}))
    .pipe(gulp.dest(demoDirectory ))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task("sass", function() {
	return eventStream.merge(
		compileSass(srcSass, demoDirectory, "component.css",true,false)
	);
});

gulp.task("js", function() {
	return eventStream.merge(
		compileJsAndMaybeHtml(
			srcJs,
			demoDirectory,
			"component.js",
			true,
			true
		),
		compileJsAndMaybeHtml(
			demoJs,
			demoDirectory,
			"demo.app.js",
			true,
			true
		)
	);
});

gulp.task("img",  function() {
	return eventStream.merge(
		gulp.src(srcImgDirectory)
			.pipe(gulp.dest(demoDirectory + "/images"))
	);
});


gulp.task("vendor", function() {
	return eventStream.merge(
		compileJsAndMaybeHtml(
      vendorSrcJs,
      demoDirectory,
      "vendor.js",
      false,
      true),
		gulp.src(vendorSrcCss)
			.pipe(concat("vendor.css"))
			.pipe(gulp.dest(demoDirectory))
	);
});

function compileHtml(source, destination) {
	return gulp.src(source)
		.pipe(newer(demoDirectory))
		.pipe(minifyHTML({empty: true, spare: true}))

		.pipe(gulp.dest(destination))
    .pipe($.connect.reload());
}

function compileSass(source, destination, concatName, minify, hideErrors) {
	return gulp.src(source)
		.pipe(sass())
		.pipe(csslint("csslintrc.json"))
		.pipe(gulpif(hideErrors, csslint.reporter()))
		.pipe(gulpif(minify, minifyCSS()))
		.pipe(concat(concatName))
		.pipe(gulp.dest(destination))
    .pipe($.connect.reload());
}

function compileJsAndMaybeHtml(source, destination, concatName, minify, showErrors) {
	return gulp.src(source)
		.pipe(gulpif(/[.]js$/, jshint()))
		.pipe(gulpif(/[.]html$/, minifyHTML({
			empty: true,
			quotes: true,
			spare: true
		})))
		.pipe(gulpif(/[.]html$/, html2js({
			moduleName: "asofdate",
			prefix: ""
		})))
		.pipe(gulpif(minify, uglify({mangle: false})))
		.pipe(concat(concatName))
		.pipe(gulp.dest(destination))
    .pipe($.connect.reload());
}
gulp.task('server', function(done) {
  $.connect.server({
    root: demoDirectory ,
    port: $.util.env.port || 1337,
    livereload: {
      port: 35729
    }
  });
});
