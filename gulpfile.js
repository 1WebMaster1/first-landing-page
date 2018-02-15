var gulp = require('gulp');
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'), 
    cache        = require('gulp-cache');


 

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11'], { cascade: true }))
        .pipe(gulp.dest('app/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

	gulp.task('html', function () {
	    return gulp.src('app/*.html')
	        .pipe(useref())
	        .pipe(gulpif('*.js', uglify()))
	        .pipe(gulpif('*.css', minifyCss()))
	        .pipe(gulp.dest('dist'));
	});

gulp.task('build', ['clean', 'img', 'sass', 'html'], function() {

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);