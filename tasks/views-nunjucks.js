'use strict';

// Compile HTML files with Nunjucks templating engine
module.exports = function ($, config, gulp, requireUncached) { return function () {
  var merge = require('merge');
  var metadata = {
    config: merge(requireUncached('../app/metadata/config'), config),
    theme: requireUncached('../app/themes/' + config.appTheme + '/variables')
  };

  function markdownRender(markdown) {
    var cm = require('commonmark');
    var reader = new cm.Parser();
    var writer = new cm.HtmlRenderer();
    var parsed = reader.parse(markdown);
    return writer.render(parsed);
  }

  return gulp.src([
      'app/**/*.html',
      '!app/bower_components/**',
      '!app/test/**',
      '!app/themes/**',
      '!app/views/**'
    ])
    .pipe($.plumber({
      handleError: function (error) {
        console.log(error);
        // For gulp.watch
        // http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/
        this.emit('end');
      }
    }))
    .pipe($.nunjucksHtml({
      locals: merge(metadata, requireUncached('../app/metadata/general')),
      searchPaths: ['app/content', 'app/elements', 'app/views'],
      tags: {
        variableStart: '{$',
        variableEnd: '$}'
      },
      setUp: function(env) {
        require('nunjucks-markdown').register(env, markdownRender);
        return env;
      }
    }))
    .pipe(gulp.dest('.tmp'));
};};
