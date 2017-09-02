var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    pug         = require('gulp-pug');

var rutas = {
    js: "dist/js",
    css: "dist/css",
    sass: "sass"
}

/* Tarea Server */
gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: "./dist"  
    });

    /* Lugares donde el evento watch escucha cambios en archivos */
    gulp.watch( rutas.sass + '/**/*.sass', ['sass']);
    gulp.watch("*.html",['html']);
    gulp.watch("views/*.pug",['views']);
});

/* Tarea Sass */
gulp.task('sass',function(){
    var stream = gulp.src([ rutas.sass + '/*.sass'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest( rutas.css ))
    .pipe(browserSync.stream());

    return stream;
});

/* Tarea html */
gulp.task('html',function(){
    var stream = gulp.src([ '*.html'])
    .pipe(gulp.dest( 'dist' ))
    .pipe(browserSync.stream());

    return stream;
});

gulp.task('views', function buildHTML() {
    return gulp.src('views/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest( 'dist' ))
    .pipe(browserSync.stream());
});

/* Tarea Js */
gulp.task('jsVendor',function(){
    var stream =  gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(rutas.js))
    .pipe(browserSync.stream());

    return stream;
});

/* Tarea fonts de iconos */
gulp.task('fonts', function() {
    var stream = gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest( 'dist/fonts'))

    return stream;
});
  
/* Tarea fa css de iconos */
gulp.task('fa', function() {
    var stream = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(rutas.css))

    return stream;
})

gulp.task('default', ['jsVendor','fonts','html','views','fa','server']);