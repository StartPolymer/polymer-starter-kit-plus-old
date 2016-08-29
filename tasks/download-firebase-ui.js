'use strict';

// Download newest script firebase-ui.js from Google, because link
// https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.js has set only 2 hours cache
module.exports = function ($, gulp) { return function () {
  return $.download('https://www.gstatic.com/firebasejs/ui/live/0.4/firebase-ui-auth.js')
    .pipe(gulp.dest('app/scripts'))
    .pipe($.size({title: 'Copy downloaded firebase-ui-auth.js file to app/scripts dir:'}));
};};
