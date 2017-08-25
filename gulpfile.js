var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

var rutas = {
    app: "dist",
    js: rutas.app + "/js",
    css: rutas.app + "/css",
    sass: "sass"
}

/* Tarea Server */
gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: "./dist"  
    });

    /* Lugares donde el evento watch escucha cambios en archivos */
    gulp.watch( rutas.sass + '/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', reload );
});

/* Tarea Sass */
gulp.task('sass',function(){
    var stream = gulp.src([ rutas.sass + '/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest( rutas.css ))
    .pipe(browserSync.stream());

    return stream;
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
    .pipe(gulp.dest( rutas.app + '/fonts'))

    return stream;
});
  
/* Tarea fa css de iconos */
gulp.task('fa', function() {
    var stream = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(rutas.css))

    return stream;
})

gulp.task('default', ['jsVendor','fonts','fa','server']);