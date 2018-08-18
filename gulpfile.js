const gulp = require('gulp');
    $ = require('gulp-load-plugins')();

const config = {
    styles: {
        src: './src/sass/*.scss',
        devDest: './dev_dist/styles',
        prodDest: './dist/styles',
        devSassOptions: {
            outputStyle: 'expanded'
        },
        prodSassOptions: {
            outputStyle: 'compressed'
        }
    },
    scripts: {
        src: [
            './src/js/*.js',
            'bower_components/requirejs/require.js'
        ],
        devDest: './dev_dist/js',
        prodDest: './dist/js',
        jsBundle: 'app.js'
    },
    html: {
        src: './src/index.html',
        devDest: './dev_dist',
        prodDest: './dist',
        beautifyOptions: {
            indentSize: 4
        }
    },
    images: {
        src: './src/images/**/*',
        devDest: './dev_dist/images',
        prodDest: './dist/images'
    }
}

gulp.task('dev:styles', devStyles);
gulp.task('dev:scripts', devScripts);
gulp.task('dev:html', devHTML);
gulp.task('dev:watch', devWatch);
gulp.task('dev:images', devImages);

gulp.task('dev:build', gulp.parallel(
    'dev:styles',
    'dev:html',
    'dev:scripts',
    'dev:images'
));
gulp.task('dev', gulp.series(
    'dev:build',
    'dev:watch'
));

gulp.task('prod:styles', prodStyles);
gulp.task('prod:scripts', prodScripts);
gulp.task('prod:html', prodHTML);
gulp.task('prod:watch', prodWatch);
gulp.task('prod:images', prodImages);

gulp.task('prod:build', gulp.parallel(
    'prod:styles',
    'prod:html',
    'prod:scripts',
    'prod:images'
));

gulp.task('prod', gulp.series(
    'prod:build',
    'prod:watch'));

function devStyles() {
    return gulp.
        src(config.styles.src).
        pipe($.sourcemaps.init()).
        pipe($.sass(config.styles.devSassOptions)).
        pipe($.sourcemaps.write()).
        pipe(gulp.dest(config.styles.devDest));
}

function prodStyles() {
    return gulp.
        src(config.styles.src).
        pipe($.sass(config.styles.prodSassOptions)).
        pipe($.minifyCss()).
        pipe(gulp.dest(config.styles.prodDest));
}

function devScripts() {
    const src = config.scripts.src;
    src.push('./src/js/dev/*js')
    return gulp.
        src(src).
        pipe($.sourcemaps.init()).
        pipe($.babel()).
        pipe($.sourcemaps.write()).
        pipe(gulp.dest(config.scripts.devDest));
}

function prodScripts() {
    const src = config.scripts.src;
    src.push('./src/js/prod/*js')
    return gulp.
        src(src).
        pipe($.removeLogging()).
        pipe($.babel()).
        pipe(gulp.dest(config.scripts.prodDest));
}

function devHTML(){
    return gulp.
        src(config.html.src).
        pipe($.htmlBeautify(config.html.beautifyOptions)).
        pipe(gulp.dest(config.html.devDest));
}

function prodHTML(){
    return gulp.
        src(config.html.src).
        pipe(gulp.dest(config.html.prodDest));
}

function devImages() {
    return gulp.
        src(config.images.src).
        pipe(gulp.dest(config.images.devDest));
}

function prodImages() {
    return gulp.
        src(config.images.src).
        pipe(gulp.dest(config.images.prodDest));
}

function devWatch(){
    gulp.watch(config.scripts.src, gulp.series('dev:scripts'));
    gulp.watch(config.styles.src, gulp.series('dev:styles'));
    gulp.watch(config.html.src, gulp.series('dev:html'));
    gulp.watch(config.images.src, gulp.series('dev:images'));
}

function prodWatch(){
    gulp.watch(config.scripts.src, gulp.series('prod:scripts'));
    gulp.watch(config.styles.src, gulp.series('prod:styles'));
    gulp.watch(config.html.src, gulp.series('prod:html'));
    gulp.watch(config.images.src, gulp.series('prod:images'));
}