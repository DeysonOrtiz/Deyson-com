// .eleventy.js
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  
  return {
    dir: {
      input: "pages",
      includes: "../_includes",
      output: "_site"
    },
    // Specify template formats and engines
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};