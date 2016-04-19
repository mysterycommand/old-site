import gulp from 'gulp';
import ghtmlmin from 'gulp-htmlmin';

import html from './config/gulp/html';
import copy from './config/gulp/copy';

gulp.task('html', html);
gulp.task('copy', copy);

gulp.task('default', [
    'copy',
    'html',
]);
