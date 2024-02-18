let project_folder = "dist",
source_folder = "src";

let path = {
    build:{
        index_php: project_folder + "/",
        php: project_folder + "/php/",
        js: project_folder + "/js/",
        js_special: project_folder + "/js/",
        css: project_folder + "/css/",
        theme_L_basic: project_folder + "/theme_L_basic/",
        user00s_L_obj00s: project_folder + "/user00s_L_obj00s/",
        img: project_folder + "/img/",
        icons_L_root: project_folder + "/",
        fonts: project_folder + "/fonts/",
        html_content_items: project_folder + "/content_items/",
        channel_post: project_folder + "/channels/",
        technical_post: project_folder + "/technical_post/",
        htaccess: project_folder + "/",
        txt_root: project_folder + "/",
        basket: project_folder + "/basket/",
        zip_L_timing_container: project_folder + "/zip_L_timing_container/",
    },
    src:{
        index_php: source_folder + "/*.php",
        php: source_folder + "/php/**/*.php",
        js_special: source_folder + "/js_special/",
        js: source_folder + "/js/",
        css: [source_folder + "/css/collector.scss"],
        theme_L_basic: source_folder + "/theme_L_basic/*.css",
        user00s_L_obj00s: source_folder + "/user00s_L_obj00s/",
        img: source_folder + "/img/**/*.{jpg,png,svg,webp,php}",
        icons_L_root: source_folder + "/*.{jpg,png,svg,webp,php}",
        fonts: source_folder + "/fonts/*.{otf,ttf,woff2}",
        html_content_items: source_folder + "/content_items/**/*.php",
        channel_post: source_folder + "/channels/**/*",
        technical_post:source_folder + "/technical_post/**/*.php",
        htaccess: source_folder + "/.htaccess",
        txt_root: source_folder + "/*.txt",
        basket: source_folder + "/basket/",
        zip_L_timing_container: source_folder + "/zip_L_timing_container/",
        cache: source_folder + "/tmp/cache.json"
    },
    watch:{
        index_php: source_folder + "/index.php",
        php: source_folder + "/php/",
        js: source_folder + "/js/**/*.{js,ts}",
        js_special: source_folder + "/js_special/**/*.{js,ts}",
        css: source_folder + "/css/**/*.{css,scss}",
        theme_L_basic: source_folder + "/*.{css,scss}",
        user00s_L_obj00s: source_folder + "/*.json",
        img: source_folder + "/img/**/*.{jpg,png,svg,webp,php}",
        icons_L_root: source_folder + "/*.{jpg,png,svg,webp,php}",
        html_content_items: source_folder + "/content_items/**/*.php",
        channel_post: source_folder + "/channels/**/*.*",
        technical_post: source_folder + "/technical_post/**/*.php",
        htaccess: source_folder + "/.htaccess",
        txt_root: source_folder + "/*.txt",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    del = require('del'),
    scss = require("gulp-sass")(require("sass")),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require("gulp-clean-css"),
    htmlmin = require('gulp-htmlmin'),
    webpack = require('webpack-stream'),
    walk    = require('walk'),
    browserify = require('browserify'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    path1 = require('path'),
    glob = require('glob');


let webConfig = {
    target: "node",
    mode: 'development',
    entry: './src/js/nodes/index.ts',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename:'bundle.js',
        path: path1.resolve(__dirname, 'js/dist'),
    },
};

let js_special_E_configuration = {
    target: "node",
    mode: 'development',
    entry: glob.sync('./src/js_special/*.{ts, js}').reduce((name00s, entry) => {
        console.log(entry);
        const name = entry.slice(
            entry.lastIndexOf('\\') + 1, 
            entry.lastIndexOf('.')
        );
        name00s[name] = "./" + entry;
        console.log(JSON.stringify(name00s));
        return name00s;
    }, {}),
    output: {
      path: path1.resolve(__dirname, 'dist/js'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
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
        //.pipe(get_js_uglify(path.build.js))
}
function get_js_uglify(files_dir){

    var files   = [];
    
    var walker = walk.walk(files_dir, { followLinks: false });
    walker.on('file', function(root, stat, next) {
        var some_file = {};
        var content = fs.readFile(root + '/' + stat.name, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
          });
        some_file[stat.name] = content;
        files.push(some_file);
        next();
    });
    
    let cacheFileName = path.src.cache;
    let options = {
        mangle: {
            properties: true,
        },
        nameCache: JSON.parse(fs.readFileSync(cacheFileName, "utf8"))
    };

    for(let i = 0; i < files.length; i++){
        fs.writeFileSync(files_dir+Object.keys(files[i])[0], uglify.minify(
            JSON.stringify(files[i])
        , options).code, "utf8");
    }
    fs.writeFileSync(cacheFileName, JSON.stringify(options.nameCache), "utf8");
}
function js_special(){
    return src(path.src.js_special)
        .pipe(webpack(js_special_E_configuration))
        .pipe(dest(path.build.js_special))
        //.pipe(get_js_uglify(path.build.js))
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
    icons_L_root();
    return src(path.src.img)
        .pipe(dest(path.build.img))
}
function icons_L_root(){
    return src(path.src.icons_L_root)
        .pipe(dest(path.build.icons_L_root))
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
function theme_L_basic(){
    return src(path.src.theme_L_basic)
        .pipe(dest(path.build.theme_L_basic))
}
function user00s_L_obj00s(){
    return src(path.src.user00s_L_obj00s)
        .pipe(dest(path.build.user00s_L_obj00s))
}
function zip_L_timing_container(){
    return src(path.src.zip_L_timing_container)
        .pipe(dest(path.build.zip_L_timing_container))
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
    gulp.watch([path.watch.theme_L_basic], theme_L_basic);
    gulp.watch([path.watch.user00s_L_obj00s], user00s_L_obj00s);
}

function clean(){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(
    index_php, 
    js, 
    js_special, 
    php, 
    css, 
    img, 
    html_content_items, 
    channel_post, 
    technical_post, 
    fonts, 
    htaccess, 
    txt_root, 
    basket, 
    theme_L_basic, 
    user00s_L_obj00s,
    zip_L_timing_container
));

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
exports.theme_L_basic = theme_L_basic;
exports.user00s_L_obj00s = user00s_L_obj00s;
exports.zip_L_timing_container = zip_L_timing_container;
exports.html_content_items = html_content_items;
exports.channel_post = channel_post;
exports.technical_post = technical_post;
