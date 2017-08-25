var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

/* Tarea Server */
gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: "./src"  
    });

    /* Lugares donde el evento watch escucha cambios en archivos */
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', reload );
});

/* Tarea Sass */
gulp.task('sass',function(){
    var stream = gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());

    return stream;
});

/* Tarea Js */
gulp.task('js',function(){
    var stream =  gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());

    return stream;
});

/* Tarea fonts de iconos */
gulp.task('fonts', function() {
    var stream = gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))

    return stream;
});
  
/* Tarea fa css de iconos */
gulp.task('fa', function() {
    var stream = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))

    return stream;
})

gulp.task('default', ['js','fonts','fa','server']);