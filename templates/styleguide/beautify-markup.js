// const beautify = require("simply-beautiful");
const beautify = require("js-beautify").html;
const glob = require("glob");
const fs = require("fs");

const options = {
  indent_size: "2",
  indent_char: " ",
  max_preserve_newlines: "-1",
  preserve_newlines: false,
  keep_array_indentation: false,
  break_chained_methods: false,
  indent_scripts: "normal",
  brace_style: "collapse",
  space_before_conditional: true,
  unescape_strings: false,
  jslint_happy: false,
  end_with_newline: false,
  wrap_line_length: "0",
  indent_inner_html: true,
  comma_first: false,
  e4x: false,
  indent_empty_lines: false,
};

glob("public/_variants/_default/**/*.html", function (er, files) {
  files.forEach((file) => {
    let markup = fs.readFileSync(file, "utf-8");
    let beautyMarkup = beautify(markup, options);

    fs.writeFile(file, beautyMarkup, function (err) {
      if (err) {
        new Error(err);
      }
    });
  });
});
