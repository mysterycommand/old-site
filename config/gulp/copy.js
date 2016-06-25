import gulp from 'gulp';

export default () => {
    return gulp
        .src([
            'source/*.ico',
            'source/*.txt',
        ])
        .pipe(gulp.dest('public'));
}
