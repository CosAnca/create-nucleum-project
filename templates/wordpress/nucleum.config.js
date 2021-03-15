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
    dest: "../",
  },
  stylesheets: {
    dest: "css",
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
    rev: {
      manifestDir: "",
    },
  },
};
