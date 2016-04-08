
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
var connect = require("gulp-connect");
var html2js = require("gulp-ng-html2js");
var replace = require("gulp-replace");
var path = require("path");
var jshint = require("gulp-jshint");
var csslint = require("gulp-csslint");
var $ = require('gulp-load-plugins')();

var srcHtml = ["component/src/index.html"];
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
var demoDirectory = distDirectory + "/demo";
var srcImgDirectory = ["component/src/images/*"];

var demoHtml = "component/demo/index.html";

var vendorSrcJs = [
	"node_modules/angular/angular.js",
	"node_modules/jquery/dist/jquery.js",
  "node_modules/d3/d3.js",
  "node_modules/underscore/underscore.js"
];

var vendorSrcCss = [
    	"node_modules/bootstrap/dist/css/bootstrap.css"
];


// Tasks
gulp.task("default", ["watch"]);

gulp.task("watch", ["build"], function() {
	gulp.watch([srcHtml, demoHtml], ["html"]);
	gulp.watch(srcSass, ["sass"]);
	gulp.watch([srcJs, demoJs], ["js"]);

});

gulp.task("build", ["html", "sass", "js", "img", "vendor"]);
gulp.task("clean", function() {
	return gulp.src(distDirectory, { read: false })
		.pipe(clean());
});



gulp.task("html", function() {
	return eventStream.merge(
		compileHtml(demoHtml, distDirectory + "/demo")
	);
});

gulp.task("sass", function() {
	return eventStream.merge(
		compileSass(srcSass, distDirectory+ "/demo", "component.css")
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
      true,
      true),
		gulp.src(vendorSrcCss)
			.pipe(concat("vendor.css"))
			.pipe(gulp.dest(demoDirectory))
	);
});




function compileHtml(source, destination) {
	return gulp.src(source)
		.pipe(newer(distDirectory))
		// .pipe(minifyHTML({empty: true, spare: true}))

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

gulp.task('server', function() {
  $.connect.server({
    root: distDirectory,
    port: 4000,
    livereload: {
      port: 30000
    }
  });
});

// gulp.task("e2e-test", ["server"], function(done) {
// 	exec("protractor protractor.conf.js", function(err, stdout) {
// 		console.log(stdout);
// 		connect.serverClose();
// 		done();
// 	});
// });
//
// var postProcessJunitTestReports = function() {
// 	return gulp.src('target/jstestdriver/*.xml')
// 		.pipe(replace(' PhantomJS 1.9.8 (Linux)', '.unit'))
// 		.pipe(gulp.dest('target/jstestdriver'));
// };
//
// gulp.task("unit-test", function(done) {
// 	return karma.start({
// 		configFile: __dirname + "/karma.conf.js",
// 		singleRun: true
// 	}, postProcessJunitTestReports);
// });
 
