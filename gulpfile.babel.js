import gulp from 'gulp';

import copy from './config/gulp/copy';
import deploy from './config/gulp/deploy';
import html from './config/gulp/html';

gulp.task('copy', copy);
gulp.task('deploy', deploy);
gulp.task('html', html);

gulp.task('default', [
    'copy',
    'html',
]);
