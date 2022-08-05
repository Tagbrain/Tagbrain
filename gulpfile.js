let project_folder = "dist",
source_folder = "src";

let path = {
    build:{
        index_php: project_folder + "/",
        php: project_folder + "/php/",
        js: project_folder + "/js/",
        js_special: project_folder + "/js/",
        css: project_folder + "/css/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        html_content_items: project_folder + "/content_items/",
        channel_post: project_folder + "/channels/",
        technical_post: project_folder + "/technical_post/",
        htaccess: project_folder + "/",
        txt_root: project_folder + "/",
        basket: project_folder + "/basket/",
    },
    src:{
        index_php: source_folder + "/*.php",
        php: source_folder + "/php/**/*.php",
        js_special: source_folder + "/js_special/*.js",
        js: source_folder + "/js/",
        css: [source_folder + "/css/collector.scss"],
        img: source_folder + "/img/**/*.{jpg,png,svg,webp,php}",
        fonts: source_folder + "/fonts/*.{otf,ttf,woff2}",
        html_content_items: source_folder + "/content_items/**/*.php",
        channel_post: source_folder + "/channels/**/*.*",
        technical_post:source_folder + "/technical_post/**/*.php",
        htaccess: source_folder + "/.htaccess",
        txt_root: source_folder + "/*.txt",
        basket: source_folder + "/basket/",
    },
    watch:{
        index_php: source_folder + "/index.php",
        php: source_folder + "/php/",
        js: source_folder + "/js/**/*.js",
        js_special: source_folder + "/js_special/*.js",
        css: source_folder + "/css/**/*.{css,scss}",
        img: source_folder + "/img/**/*.{jpg,png,svg,webp,php}",
        html_content_items: source_folder + "/content_items/**/*.php",
        channel_post: source_folder + "/channels/**/*.*",
        technical_post: source_folder + "/technical_post/**/*.php",
        htaccess: source_folder + "/.htaccess",
        txt_root: source_folder + "/*.txt",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require ('gulp'),
gulp = require('gulp'),
del = require('del'),
scss = require("gulp-sass")(require("sass")),
group_media = require('gulp-group-css-media-queries'),
clean_css = require("gulp-clean-css"),
htmlmin = require('gulp-htmlmin'),
webpack = require('webpack-stream'),
browserify = require('browserify');

let webConfig = {
    target: "node",
    mode: 'development',
    entry: './src/js/nodes/index.js',
    output: {
        filename:'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    }
};
function index_php(){
    return src(path.src.index_php)
        .pipe(dest(path.build.index_php))
}

function php(){
    return src(path.src.php)
        .pipe(dest(path.build.php))
}

function js(){
    return src(path.src.js)
        .pipe(webpack(webConfig))
        .pipe(dest(path.build.js))
}
function js_special(){
    return src(path.src.js_special)
        .pipe(dest(path.build.js_special))
}
function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(clean_css())
        .pipe(dest(path.build.css))
}

function img(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
}
function html_content_items(){
    return src(path.src.html_content_items)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html_content_items))
}
function channel_post(){
    return src(path.src.channel_post)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.channel_post))
}
function technical_post(){
    return src(path.src.technical_post)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.technical_post))
}
function fonts(){
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}
function htaccess(){
    return src(path.src.htaccess)
        .pipe(dest(path.build.htaccess))
}

function txt_root(){
    return src(path.src.txt_root)
        .pipe(dest(path.build.txt_root))
}
function basket(){
    return src(path.src.basket)
        .pipe(dest(path.build.basket))
}

function watchFiles(params){
    gulp.watch([path.watch.index_php], index_php);
    gulp.watch([path.watch.php], php);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.js_special], js_special);
    gulp.watch([path.watch.html_content_items], html_content_items);
    gulp.watch([path.watch.channel_post], channel_post);
    gulp.watch([path.watch.technical_post], technical_post);
    gulp.watch([path.watch.htaccess], htaccess);
    gulp.watch([path.watch.txt_root], txt_root);
    gulp.watch([path.watch.css], css);
}

function clean(){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(index_php, js, js_special, php, css, img, html_content_items, channel_post, technical_post, fonts, htaccess, txt_root, basket));
let build_watch = gulp.parallel(build, watchFiles);

exports.build_watch = build_watch;
exports.build = build;
exports.clean = clean;
exports.default = build_watch;

exports.watchFiles = watchFiles;
exports.index_php = index_php;
exports.js = js;
exports.js_special = js_special;
exports.css = css;
exports.php = php;
exports.img = img;
exports.fonts = fonts;
exports.htaccess = htaccess;
exports.txt_root = txt_root;
exports.basket = basket;
exports.html_content_items = html_content_items;
exports.channel_post = channel_post;
exports.technical_post = technical_post;
