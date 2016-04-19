import gulp from 'gulp';

export default () => {
    return gulp
        .src([
            'source/*.ico',
            'source/*.png',
            'source/*.txt',
        ])
        .pipe(gulp.dest('public'));
}
