// Pull in fractal
const fractal       = require('./fractal.js');
const logger        = fractal.cli.console;

// Gulpy gulp
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const svgsymbols    = require('gulp-svg-symbols');
const svgmin        = require('gulp-svgmin');
const autoprefixer  = require('gulp-autoprefixer');
const surge         = require('gulp-surge');
const del           = require('del');

// Paths
const paths = {
  src: `${__dirname}/src`,
  dest: `${__dirname}/tmp`,
  build: `${__dirname}/www`
};

// Deploy location:
const surgeURL = 'https://vam-design-guide.surge.sh';


//---
// Empty temp folders
function clean() {
  return del(`${paths.dest}/assets/`);
  return del(`${paths.build}`);
}


//---
// Setup a local server
function serve() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal online at: ${server.url}`);
  });
}


//---
// Create a static build of fractal
// Build location defined in `fractal.js`
function staticBuild() {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build complete');
  });
}


//---
// Deploy to surge
function deploy() {
  return surge({
    project: paths.build,
    domain: surgeURL
  });
}


//---
// Style
function styles() {
  // Look at replacing a lot of this with postCSS
  return gulp.src(`${paths.src}/assets/styles/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${paths.dest}/assets/styles`));
}


//---
// Fonts
function fonts() {
  return gulp.src(`${paths.src}/assets/fonts/**/*`)
    .pipe(gulp.dest(`${paths.dest}/assets/fonts`));
}


//---
// SVG Icons
function svg() {
  return gulp.src(`${paths.src}/assets/svg/*.svg`)
    .pipe(svgmin())
    .pipe(svgsymbols({
      svgClassname: 'u-svg-icon',
      templates: [`${paths.src}/assets/templates/svg-template.svg`]
    }))
    .pipe(gulp.dest(`${paths.dest}/assets/svg`));
}


//---
// Watch
function watch() {
  serve();
  gulp.watch(`${paths.src}/**/*.scss`, styles);
  gulp.watch(`${paths.src}/assets/svg/*.svg`, svg);
  gulp.watch(`${paths.src}/assets/fonts`, fonts);
}

const compile = gulp.series(clean, gulp.parallel(fonts, svg, styles));

gulp.task('dev', gulp.series(compile, watch));
gulp.task('deploy', gulp.series(compile, staticBuild, deploy));
