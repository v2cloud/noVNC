const gulp = require('gulp')
const replace = require('gulp-replace')
const del = require('del')

// delete src folder
const clean = () => del('./src/**', {force: true});

// copy novnc static files
const copy_static_files = () => 
        gulp.src(['../app/**/*', 
                  '../core/**/*', 
                  '../vendor/**/*'], 
                  {base: '../'})
                  .pipe(gulp.dest('./src'));
                  
// copy vnc.html file
const copy_vnc_file = () => 
        gulp.src('../vnc.html')
          // remove css and js files
            .pipe(replace(/<link.+base.css">/g, function(match, p1, offset, string) {
              console.log('Found bass.css' + match);
              return '';
            }))
            .pipe(replace(/<script.+>/g, function(match, p1, offset, string) {
              console.log('Found js files' + match);
              return '';
            }))
          // replace noVNC icons with v2 cloud icons
            .pipe(replace(/app\/images\/icons\/novnc/g, function(match, p1, offset, string) {
              console.log('Found icons files' + match);
              return 'app/images/icons/v2-novnc';
            }))
            .pipe(gulp.dest('./src'));

const copy_index_file = () => gulp.src('./index.js').pipe(gulp.dest('./src'));

gulp.task('default', gulp.series(clean, gulp.parallel(copy_static_files, copy_vnc_file, copy_index_file)), () => {});
