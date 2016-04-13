import gulp from 'gulp';
import ghtmlmin from 'gulp-htmlmin';

import html from './config/gulp/html';
import txt from './config/gulp/txt';

gulp.task('html', html);
gulp.task('txt', txt);

gulp.task('default', ['html', 'txt']);
