/* global process */
const path = require("path");

module.exports = {
  // Project config: Defaults to name and version from package.json.
  // Here you can overwrite it and add more custom properties.
  // For a detailed documentation of all the options in here see
  // https://uiengine.uix.space/basics/config/
  name: "Design System",
  version: "1.0.0",

  // Base directories for the input, your raw source files:
  // - components is the root of the directory containing the components
  // - templates contains the variant preview and application templates
  // - pages is the directory of the UIengine's site structure and page markdown files
  source: {
    components: ["./src/views/components", "./src/views/pages"],
    templates: "./src/views/templates",
    pages: "./uiengine",
  },

  // Destination paths for the generated output.
  target: "./public",

  // Adapters are used for templating/rendering. Each adapter is a module that gets required
  // and needs to provide functions for setup and rendering. For details see the adapters docs.
  adapters: {
    ejs: {
      module: "@uiengine/adapter-ejs",
      options: {
        root: path.resolve(process.env.INIT_CWD, "src/views/components"),
      },
    },
  },

  // Here you can configure the template that the variant preview gets embeded in.
  template: "uiengine.ejs",

  ui: {
    cache: false,
    lang: "en",
    // hljs: 'atom-one-dark',
    viewports: {
      Phone: {
        width: 320,
      },
      Tablet: {
        width: 768,
      },
      Desktop: {
        width: 1280,
      },
    },
    breakpoints: {
      SM: 320,
      MD: 640,
      LG: 980,
      XL: 1200,
    },
  },
};
