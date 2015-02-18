This repository is a starting point for AngularJS projects using the [Gulp](http://gulpjs.com/) streaming build system. Almost everything important is in `gulpfile.js`. For a full discussion of the setup, please refer to the companion [blog post](http://paislee.io/a-healthy-gulp-setup-for-angularjs-projects).

## Installation

Before running any Gulp tasks:

1. Check out this repository
2. Ensure you have node installed
3. Run `npm install` in the root directory (this will install bower dependencies too)

## Gulp Tasks

// clean
gulp.task('clean-dev', function() {
    var deferred = Q.defer();
    del(paths.distDev, function() {
        deferred.resolve();
    });
    return deferred.promise;
});
gulp.task('clean-prod', function() {
    var deferred = Q.defer();
    del(paths.distProd, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

// check partials
gulp.task('validate-partials', pipes.validatedPartials);

// build partials
gulp.task('build-partials-dev', pipes.builtPartialsDev);
gulp.task('convert-partials-to-js', pipes.scriptedPartials);

// check devserver scripts
gulp.task('validate-devserver-scripts', pipes.validatedDevServerScripts);

// check app scripts
gulp.task('validate-app-scripts', pipes.validatedAppScripts);

// build app scripts
gulp.task('build-app-scripts-dev', pipes.builtAppScriptsDev);
gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

// build styles
gulp.task('build-styles-dev', pipes.builtStylesDev);
gulp.task('build-styles-prod', pipes.builtStylesProd);

// build vendor scripts
gulp.task('build-vendor-scripts-dev', pipes.builtVendorScriptsDev);
gulp.task('build-vendor-scripts-prod', pipes.builtVendorScriptsProd);

// build index
gulp.task('build-index-dev', pipes.builtIndexDev);
gulp.task('build-index-prod', pipes.builtIndexProd);

// build everything
gulp.task('build-app-dev', pipes.builtAppDev);
gulp.task('build-app-prod', pipes.builtAppProd);

// clean and build everything
gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);
gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

// watch changes in dev mode
gulp.task('watch-dev', ['clean-build-app-dev'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'development'} })
        .on('change', ['jshint-devserver'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({ start: true });

    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.index, function() {
        return pipes.builtIndexDev()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.partials, function() {
        return pipes.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.styles, function() {
        return pipes.builtStylesDev()
            .pipe(plugins.livereload());
    });

});

// watch changes in production mode
gulp.task('watch-prod', ['clean-build-app-prod'], function() {

    // start nodemon to auto-reload the dev server
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
        .on('change', ['jshint-devserver'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    // start live-reload server
    plugins.livereload.listen({start: true});

    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.index, function() {
        return pipes.builtIndexProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.partials, function() {
        return pipes.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.styles, function() {
        return pipes.builtStylesProd()
            .pipe(plugins.livereload());
    });
});

// default task builds for prod
gulp.task('default', ['clean-prod'], pipes.builtAppProd);

## Additional commands