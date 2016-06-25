import gulp from 'gulp';
import ghtmlmin from 'gulp-htmlmin';

export default () => {
    return gulp
        .src(['source/*.html'])
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
}
