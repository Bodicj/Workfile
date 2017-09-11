var gulp         = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-ruby-sass'), //Подключаем Sass пакет,
	sourcemaps   = require('gulp-sourcemaps'),
	fileinclude  = require('gulp-file-include'),
	spritesmith  = require('gulp.spritesmith'),
	notify       = require('gulp-notify'),
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	browserSync  = require('browser-sync');

var config = {
		server: {
			baseDir: "./dist"
		},
		tunnel: true,
		host: 'localhost',
		port: 9000,
		logPrefix: "Frontend_Devil"
	};


	// process JS files and return the stream.

	gulp.task('js', function() {
		return gulp.src([
				'app/js/libs/jquery.min.js',
				'app/js/libs/arcticmodal.min.js',
				'app/js/libs/jquery.validate.min.js',
				'app/js/libs/jquery.bxslider.min.js',
				'app/js/libs/ion.rangeSlider.min.js',
				'app/js/libs/jquery.mousewheel.min.js',
				'app/js/libs/jquery.jscrollpane.min.js',
				'app/js/script.js',
				])
				.pipe(sourcemaps.init())
				.pipe(concat("script.min.js"))
				// .pipe(sourcemaps.init({loadMaps: true}))
				// .pipe(concat('script.min.js'))
				// .pipe(uglify({outSourceMap: true})) // Об'єднуємо js файли і стискаємо їх
				// .pipe(uglify({outSourceMap: true})) // Об'єднуємо js файли і стискаємо їх
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
	});

	// create a task that ensures the `js` task is complete before
	// reloading browsers
	gulp.task('js-watch', ['js'], function (done) {
	    browserSync.reload();
	    done();
	});


	gulp.task('scss', function(){ // Создаем таск Sass
		return sass('app/scss/style.scss',{
                style: 'compressed',
                sourcemap: true
             })
			.pipe(autoprefixer(['last 3 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
			.pipe(cssnano())
	        .pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('dist/css'))
			.pipe(notify({ message: 'CSS done!' }));
	});
	gulp.task('scss-watch', ['scss'], function (done) {
	    browserSync.reload();
	    done();
	});

	// HTML
	gulp.task('html', function () {

			gulp
			.src(['./app/template/*.html'])
			.pipe(fileinclude({
		      prefix: '@@',
	          basepath: '@file'
		    }))
		    .pipe(gulp.dest('./dist'))
	        .pipe(notify({ message: 'HTML done!', onLast: true  }));
	    
	});
	gulp.task('html-watch', ['html'], function (done) {
		setTimeout(function() {
		    browserSync.reload();
		    done();
		},2000);
	});

	// use default task to launch Browsersync and watch JS files
	gulp.task('serve', ['js','scss','html'], function () {

	    // Serve files from the root of this project
	    // browserSync.init({
	    //     baseDir: "./app/"
	    // });

	    // add browserSync.reload to the tasks array to make
	    // all browsers reload after tasks are complete.
	    gulp.watch('app/img/sprite/*.*', ['sprite']);
	    gulp.watch('app/img/**/*.*', ['img']);
	    gulp.watch(['app/js/libs/*.js', 'app/js/script.js'], ['js-watch']);
	    gulp.watch('app/scss/**/*.scss', ['scss-watch']);
	    gulp.watch('app/template/**/*.html', ['html-watch']);
	});

	gulp.task('sprite', function() {
	    var spriteData = 
	        gulp.src('./app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
	            .pipe(spritesmith({
	                imgName: 'sprite.png',
	                imgPath: '../img/sprite.png',
	                cssName: 'sprite.scss',
	                cssFormat: 'scss',
	                padding: 15
	            }));

	    spriteData.img.pipe(gulp.dest('./app/img/')); // путь, куда сохраняем картинку
	    spriteData.css.pipe(gulp.dest('./app/scss/')); // путь, куда сохраняем стили
	});


	gulp.task('clean', function() {
		return del.sync('dist'); // Удаляем папку dist перед сборкой
	});

	gulp.task('img', function() {
		return gulp.src('app/img/**/*') // Берем все изображения из app
			.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
	});

	gulp.task('build', ['clean', 'img', 'scss', 'html'], function() {

		var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшн
		.pipe(gulp.dest('dist/fonts'));

		var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшн
		.pipe(gulp.dest('dist/js'));
	});

	gulp.task('clear', function (callback) {
		return cache.clearAll();
	})

	gulp.task('webserver', function () {
		browserSync(config);
	});

	gulp.task('default', ['serve', 'webserver']);
