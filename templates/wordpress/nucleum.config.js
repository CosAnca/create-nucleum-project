module.exports = {
  basePaths: {
    src: "./src",
    dest: "./public/wp-content/themes/nucleum/assets",
  },
  html: false,
  images: {
    dest: "images",
  },
  fonts: {
    dest: "fonts",
  },
  icons: {
    dest: "images",
  },
  static: {
    src: "assets/static",
    dest: "../",
  },
  stylesheets: {
    dest: "css",
    purgecss: {
      content: ["public/wp-content/themes/nucleum/**/*.php"],
      extensions: ["php"],
    },
    criticalCss: {
      siteUrl: "http://localhost",
      src: "",
      dest: "css/critical",
      config: {
        base: "./public/wp-content/themes/nucleum",
        width: 1200,
        height: 1200,
      },
    },
  },

  browserSync: {
    proxy: {
      target: "localhost",
    },
    files: ["public/wp-content/themes/nucleum/**/*.php"],
    open: false,
  },

  javascripts: {
    dest: "js",
    entry: {
      app: ["./app.js"],
    },
    publicPath: "/wp-content/themes/nucleum/assets/js/",
  },

  production: {
    rev: false,
  },
};
