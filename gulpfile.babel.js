import gulp from 'gulp';
import ghtmlmin from 'gulp-htmlmin';

gulp.task('html', () => {
    return gulp.src(['source/*.html'])
        .pipe(ghtmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeTagWhitespace: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            quoteCharacter: '"',
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('txt', () => {
    return gulp.src(['source/*.txt'])
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['html', 'txt']);
