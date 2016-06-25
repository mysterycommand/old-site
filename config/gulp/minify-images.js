import gulp from 'gulp';
import gimagemin from 'gulp-imagemin';

export default () => {
    return gulp
        .src([
            'source/icons/*',
            'source/images/*',
        ], {
            base: 'source',
        })
        .pipe(gimagemin())
        .pipe(gulp.dest('public'));
}
