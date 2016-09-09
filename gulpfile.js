/*global -$ */
'use strict';
// generated on 2016-03-30 using generator-modern-frontend 0.2.9
var fs = require('fs');
var path = require('path');

var gulp = require('gulp'),
    useref = require('gulp-useref');
    var gutil        = require('gulp-util');
var ftp          = require('vinyl-ftp');
var $ = require('gulp-load-plugins')();
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var through2 = require('through2');
var browserify = require('browserify');

var isDevelopment = (process.env.ENVIRONMENT !== "production");


gulp.task('stylesheet', ['sprites'], function () {
  return gulp.src('app/css/main.styl')
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.stylus({
      import: ['sprites/*'], // auto-import sprite files 
      errors: true
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe($.postcss([
      require('autoprefixer')({browsers: ['last 1 version']})
    ]))
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});


gulp.task('sprites', function() {
  var spritesPath = 'app/images/sprites';
  var identifiers = fs.readdirSync(spritesPath).filter(function(spritePath) {
    var stat = fs.statSync(spritesPath + '/' + spritePath);
    return stat.isDirectory();
  });

  for (var i = 0; i < identifiers.length; i++) {
    var spriteData = gulp.src(spritesPath + '/' + identifiers[i] + '/*.png').pipe($.spritesmith({
      imgName: 'sprite_' + identifiers[i] + '.png',
      cssName: identifiers[i] + '.styl',
      imgPath: '../images/sprite_' + identifiers[i] + '.png',
      cssFormat: 'stylus'
    }));

    // Pipe image stream
    spriteData.img
      .pipe(gulp.dest('.tmp/images'))
      .pipe(gulp.dest('dist/images'))

    // Pipe CSS stream
    spriteData.css
      .pipe(gulp.dest('app/css/sprites'));
  }
});


gulp.task('javascript', function () {
  return gulp.src('app/js/main.js')
    .pipe(through2.obj(function (file, enc, next){ // workaround for https://github.com/babel/babelify/issues/46
      browserify({
        entries: file.path,
        debug: isDevelopment
      }).bundle(function(err, res){
        if (err) { return next(err); }

        file.contents = res;
        next(null, file);
      });
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/js'))
    .pipe($.if(isDevelopment, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/js'));
});

gulp.task('jshint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['javascript', 'stylesheet'], function () {


  return gulp.src('app/*.html')
   
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    

    .pipe($.useref())
    .pipe(useref({searchPath: ['.tmp', 'app/*.html', '.']}))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  var pattern = 'app/fonts/**/*'
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat(pattern))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('nunjucks', function() {
return gulp.src('app/pages/*.nunjucks') 
.pipe(nunjucksRender({
path: ['app/pages/', 'app/templates/'] // String or Array
}))
.pipe(gulp.dest('app'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['stylesheet', 'javascript', 'fonts', 'nunjucks'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/*.nunjucks',
    '.tmp/js/*.{js,jsx}',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['app/css/**/*.styl', '!app/css/sprites/*.styl'], ['stylesheet']);
  gulp.watch('app/js/**/*.{js,jsx}', ['javascript']);
  gulp.watch('app/fonts/**/*', ['fonts']);
   gulp.watch('app/pages/*.nunjucks', ['nunjucks']);
   gulp.watch('app/templates/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/partials/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/partials/intro-content/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/partials/navigation/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/partials/services/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/partials/footer/*.nunjucks', ['nunjucks']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/css/*.styl')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/css'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      // exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});



gulp.task('default', ['clean'], function () {
  gulp.start('build');
});




// ## Globals

// ### Vinyl FTP
gulp.task('deploy', function() {
  var conn = ftp.create( {
    host:     'ftp.wearevolcano.com',
    user:     'wearevolcano.com',
    password: '7GFYg!j9x',
    parallel: 10,
    log:      gutil.log
  });
  var globs = [
    'dist/*.php',
    'dist/index.html',
    'dist/css/**',
    'dist/js/**',
    'dist/fonts/**',
    'dist/images/**',
    'dist/fonts/**',
    'dist/**',
    '!.git',
    '!app',
    '!*.json',
    '!.tmp',
    '!*.md',
    '!*.xml',
    '!assets',
    '!collaboration_documents',
    '!bower_components',
    '!dist/scripts/jquery.js',
    '!dist/scripts/jquery.js.map',
    '!dist/scripts/main.js',
    '!dist/scripts/main.js.map',
    '!dist/scripts/modernizr.js',
    '!dist/scripts/modernizr.js.map',
    '!dist/styles/editor-style.css',
    '!dist/styles/editor-style.css.map',
    '!dist/styles/main.css',
    '!dist/styles/main.css.map',
    '!gulpfile.js',
    '!node_modules',
    '!node_modules/**',
  ];
  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src( globs, { base: './dist/', buffer: false } )
    .pipe( conn.newer( '/public_html' ) ) // only upload newer files
    .pipe( conn.dest( '/public_html' ) );
});

