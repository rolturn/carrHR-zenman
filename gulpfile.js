/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @authors Ahmad Awais, @digisavvy, @desaiuditd, @jb510, @dmassiani and @Maxlopez
 * @package neat
 * @forks _s & some-like-it-neat
 */


// Project configuration
var project = {
  name: 'carrhr', // Project name, used for build zip.
	url: 'localhost:8081', // Local Development URL for BrowserSync. Change as-needed.
	bower: './assets/bower_components/', // Not truly using this yet, more or less playing right now. TO-DO Place in Dev branch
	build: './buildtheme/', // Files that you want to package into a zip go here
	buildInclude: [
  	// include common file types
  	'**/*.php',
  	'**/*.html',
  	'**/*.css',
  	'**/*.js',
  	'**/*.svg',
  	'**/*.ttf',
  	'**/*.otf',
  	'**/*.eot',
  	'**/*.woff',
  	'**/*.woff2',
  	// include specific files and folders
  	'screenshot.png',
  	// exclude files and folders
  	'!node_modules/**/*',
  	'!bower_components/**/*',
  	'!style.css.map',
  	'!js/scripts-src/*',
  	'!css/patrials/*'
  ]}

// Load plugins
var gulp = require('gulp')
var browserSync = require('browser-sync') // Asynchronous browser loading on .scss file changes
var reload = browserSync.reload
var autoprefixer = require('gulp-autoprefixer') // Autoprefixing magic
var minifycss = require('gulp-uglifycss')
var filter = require('gulp-filter')
var uglify = require('gulp-uglify-es').default
var imagemin = require('gulp-imagemin')
var newer = require('gulp-newer')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var notify = require('gulp-notify')
var gcmq = require('gulp-group-css-media-queries')
var runSequence = require('gulp-run-sequence')
var sass = require('gulp-sass')
var plugins = require('gulp-load-plugins')({ camelize: true })
var ignore = require('gulp-ignore') // Helps with ignoring files and directories in our run tasks
var rimraf = require('gulp-rimraf') // Helps with removing files and directories in our run tasks
var zip = require('gulp-zip') // Using to zip up our packaged theme into a tasty zip file that can be installed in WordPress!
var plumber = require('gulp-plumber') // Helps prevent stream crashing on errors
var cache = require('gulp-cache')
var sourcemaps = require('gulp-sourcemaps')

// npm install --save-dev gulp browser-sync gulp-autoprefixer gulp-uglifycss gulp-filter gulp-uglify gulp-imagemin gulp-newer gulp-rename gulp-concat gulp-notify gulp-combine-media-queries gulp-run-sequence gulp-sass gulp-load-plugins gulp-ignore gulp-rimraf gulp-zip gulp-plumber gulp-cache gulp-sourcemaps


/**
 * Browser Sync
 *
 * Asynchronous browser syncing of assets across multiple devices!! Watches for changes to js, image and php files
 * Although, I think this is redundant, since we have a watch task that does this already.
*/
gulp.task('browser-sync', function() {
	var files = [
		'**/*.php',
		'**/*.{png,jpg,gif}'
	];
	browserSync.init(files, {

		// Read here http://www.browsersync.io/docs/options/
		proxy: project.url,

		// Tunnel the Browsersync server through a random Public URL
		// tunnel: true,

		// Attempt to use the URL "http://my-private-site.localtunnel.me"
		// tunnel: "ppress",

		// Inject CSS changes
		injectChanges: true
	});
});

/**
 * Styles
 *
 * Looking at src/sass and compiling the files into Expanded format, Autoprefixing and sending the files to the build folder
 *
 * Sass output styles: https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
*/
gulp.task('styles', function () {
 	gulp.src('sass/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			//outputStyle: 'compressed',
			outputStyle: 'compact',
			// outputStyle: 'nested',
			// outputStyle: 'expanded',
			precision: 10
		}))
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(sourcemaps.write('./'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./'))
		.pipe(filter('**/*.css')) // Filtering stream to only css files
		.pipe(gcmq()) // Combines Media Queries
		.pipe(reload({stream:true})) // Inject Styles when style file is created
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss({
			maxLineLen: 80
		}))
		.pipe(gulp.dest('./'))
		.pipe(reload({stream:true})) // Inject Styles when min style file is created
		.pipe(notify({ message: 'Styles task complete', onLast: true }))
});


/**
 * Scripts: Vendors
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/
gulp.task('vendorsJs', function() {
	return 	gulp.src(['./js/vendor/*.js', project.bower+'**/*.js'])
				.pipe(concat('vendors.js'))
				.pipe(gulp.dest('./js/'))
				.pipe(rename( {
					basename: "vendors",
					suffix: '.min'
				}))
				.pipe(uglify())
				.pipe(gulp.dest('./js/'))
				.pipe(notify({ message: 'Vendor scripts task complete', onLast: true }));
});


/**
 * Scripts: Custom
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/

gulp.task('scriptsJs', function() {
	return gulp.src('js/scripts-src/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('js'))
			.pipe(rename({
			basename: "scripts",
			suffix: '.min'
		}))
		// .pipe(uglify())
		.pipe(gulp.dest('js'))
    .pipe(reload({stream:true})) // Inject Styles when style file is created
		.pipe(notify({ message: 'Custom scripts task complete', onLast: true }));
});


/**
 * Images
 *
 * Look at src/images, optimize the images and send them to the appropriate place
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
	return 	gulp.src(['./images/raw/**/*.{png,jpg,gif}'])
				.pipe(newer('./images/'))
				.pipe(rimraf({ force: true }))
				.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
				.pipe(gulp.dest('./images/'))
				.pipe( notify( { message: 'Images task complete', onLast: true } ) );
});


/**
 * Clean gulp cache
 */
 gulp.task('clear', function () {
   cache.clearAll();
 });


 /**
  * Clean tasks for zip
  *
  * Being a little overzealous, but we're cleaning out the build folder, codekit-cache directory and annoying DS_Store files and Also
  * clearing out unoptimized image files in zip as those will have been moved and optimized
 */

 gulp.task('cleanup', function() {
 	return 	gulp.src(['./bower_components', '**/.sass-cache','**/.DS_Store'], { read: false }) // much faster
		 		.pipe(ignore('node_modules/**')) //Example of a directory to ignore
		 		.pipe(rimraf({ force: true }))
		 		// .pipe(notify({ message: 'Clean task complete', onLast: true }));
 });
 gulp.task('cleanupFinal', function() {
 	return 	gulp.src(['./bower_components','**/.sass-cache','**/.DS_Store'], { read: false }) // much faster
		 		.pipe(ignore('node_modules/**')) //Example of a directory to ignore
		 		.pipe(rimraf({ force: true }))
		 		// .pipe(notify({ message: 'Clean task complete', onLast: true }));
 });

 /**
  * Build task that moves essential theme files for production-ready sites
  *
  * buildFiles copies all the files in buildInclude to build folder - check variable values at the top
  * buildImages copies all the images from img folder in assets while ignoring images inside raw folder if any
  */

  gulp.task('buildFiles', function() {
  	return 	gulp.src(project.buildInclude)
 		 		.pipe(gulp.dest(project.build))
 		 		.pipe(notify({ message: 'Copy from buildFiles complete', onLast: true }));
  });


/**
* Images
*
* Look at src/images, optimize the images and send them to the appropriate place
*/
gulp.task('buildImages', function() {
	return 	gulp.src(['images/**/*', '!images/raw/**'])
		 		.pipe(gulp.dest(project.build+'/images/'))
		 		.pipe(plugins.notify({ message: 'Images copied to buildTheme folder', onLast: true }));
});

 /**
  * Zipping build directory for distribution
  *
  * Taking the build folder, which has been cleaned, containing optimized files and zipping it up to send out as an installable theme
 */
 gulp.task('buildZip', function () {
 	// return 	gulp.src([build+'/**/', './.jshintrc','./.bowerrc','./.gitignore' ])
 	return 	gulp.src(project.build+'/**/')
		 		.pipe(zip(project.name+'.zip'))
		 		.pipe(gulp.dest('./'))
		 		.pipe(notify({ message: 'Zip task complete', onLast: true }));
 });


 // ==== TASKS ==== //
 /**
  * Gulp Default Task
  *
  * Compiles styles, fires-up browser sync, watches js and php files. Note browser sync task watches php files
  *
 */

 // Package Distributable Theme
 gulp.task('build', function(cb) {
 	runSequence('styles', 'cleanup', 'vendorsJs', 'scriptsJs',  'buildFiles', 'buildImages', 'buildZip','cleanupFinal', cb);
 });


 // Watch Task
 gulp.task('default', ['styles', 'vendorsJs', 'scriptsJs', 'images', 'browser-sync'], function () {
 	gulp.watch('./images/raw/**/*', ['images']);
 	gulp.watch('./sass/**/*.scss', ['styles']);
 	gulp.watch('./js/**/*.js', ['scriptsJs']);

 });
