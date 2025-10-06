module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("tools");
  eleventyConfig.addPassthroughCopy("clients");

  // Dynamically copy all article images to match clean URLs structure
  const fs = require("fs");

  // Find all article directories
  const articlesDir = "pages/articles";
  if (fs.existsSync(articlesDir)) {
    const articleFolders = fs
      .readdirSync(articlesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Add passthrough copy for each article's images to the correct location
    articleFolders.forEach((articleName) => {
      const imagesPath = `pages/articles/${articleName}/images`;
      if (fs.existsSync(imagesPath)) {
        eleventyConfig.addPassthroughCopy({
          [imagesPath]: `${articleName}/images`,
        });
      }
    });
  }

  // Articles collection - natural folder structure
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

  // Vimeo embed filter - WITH PLAY BUTTON AND ROUNDED CORNERS
  eleventyConfig.addFilter("embedVimeo", function (content) {
    if (!content) return content;

    // Match Vimeo URLs and replace with clickable embed code
    const vimeoRegex = /https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\S*)?/g;

    return content.replace(vimeoRegex, (match, videoId) => {
      const uniqueId =
        "vimeo-" + videoId + "-" + Math.random().toString(36).substr(2, 9);
      return `<div style="position: relative; display: inline-block; width: 100%; margin: 1em 0; border-radius: 8px; overflow: hidden;">
        <img id="${uniqueId}"
             src="https://vumbnail.com/${videoId}.jpg"
             alt="Click to play video"
             style="width: 100%; height: auto; display: block; cursor: pointer; border-radius: 8px;"
             onerror="this.src='https://i.vimeocdn.com/video/${videoId}_640x360.jpg'"
             onclick="this.parentElement.outerHTML='<iframe width=\\'100%\\'  height=\\'400\\' src=\\'https://player.vimeo.com/video/${videoId}?autoplay=1\\' frameborder=\\'0\\' allow=\\'autoplay; fullscreen; picture-in-picture\\' allowfullscreen style=\\'border-radius: 8px;\\'></iframe>'">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; background: rgba(0,0,0,0.8); border-radius: 50%; display: flex; align-items: center; justify-content: center; pointer-events: none;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>`;
    });
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
