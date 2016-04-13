import gulp from 'gulp';

export default () => {
    return gulp
        .src(['source/*.txt'])
        .pipe(gulp.dest('public'));
}
