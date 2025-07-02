module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("tools");

  // Copy article images to match the NEW structure (no /articles/ prefix)
  eleventyConfig.addPassthroughCopy({
    "pages/articles/re-discover-your-art/images": "re-discover-your-art/images", // Changed: removed "articles/"
    "pages/articles/the-power-of-using-templates/images":
      "the-power-of-using-templates/images", // Changed: removed "articles/"
  });

  // Articles collection (COMBINED - only one collection definition)
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("pages/articles/*/index.md")
      .filter((post) => !post.data.draft) // Filter out drafts
      .sort((a, b) => b.date - a.date);
  });

  // Date filter
  eleventyConfig.addFilter("dateDisplay", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", function (content) {
    const text = content.replace(/<[^>]*>/g, "");
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  });

  return {
    dir: {
      input: "pages",
      includes: "../_includes",
      output: "_site",
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
