/* global process */
const path = require("path");
const UIengine = require("@uiengine/core");
const historyApiFallback = require("connect-history-api-fallback");

module.exports = {
  html: false,
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  stylesheets: true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"],
    },

    hot: {
      enabled: false,
      reload: false,
      quiet: true,
      react: false,
    },
  },

  browserSync: {
    server: {
      baseDir: "public",
      extraMiddlewares: [historyApiFallback()],
    },
    files: ["src/views/**/*.*", "uiengine/**/*.*"],
    notify: false,
    open: false,
    ghostMode: false,
  },

  production: {
    rev: false,
  },

  additionalTasks: {
    initialize(gulp) {
      // UIengine
      gulp.task("uiengine", (done) => {
        const isProduction =
          global.production !== undefined ? global.production : false;

        const opts = {
          config: path.resolve(process.env.INIT_CWD, "uiengine.config.js"),
          watch: !isProduction,
        };

        UIengine.build(opts)
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    },
    development: {
      prebuild: ["uiengine"],
      postbuild: [],
    },
    production: {
      prebuild: [],
      postbuild: ["uiengine"],
    },
  },
};
