// grab our gulp packages
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', function () {
  return gulp.src(['api/**/*.js', '!api/**/__tests__/**'])
  .pipe(babel({plugins: ['transform-runtime']}))
  .pipe(gulp.dest('./build/api'));
  return gutil.log('Gulp is running!')
});

gulp.task('watch', ['build'], () => gulp.watch('src/**/*.ts', ['build']));
