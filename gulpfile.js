// grab our gulp packages
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src(['api/**/*.js', '!api/**/__tests__/**'])
  .pipe(babel())
  .pipe(gulp.dest('./build/api'));
  return gutil.log('Gulp is running!')
});
