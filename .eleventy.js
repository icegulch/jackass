// eleventy.config.js (Eleventy v3, ESM)
import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "./src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "./src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "./src/fonts": "css/fonts" });

  eleventyConfig.addWatchTarget("./src/css");

  eleventyConfig.addCollection("orderedPages", (collection) =>
    collection.getFilteredByTag("pages").sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
  );

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      return await minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  });

  eleventyConfig.setServerOptions({
    showAllHosts: true,
    domDiff: true,
  });

  return {
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
    dir: { input: "src", output: "public" },
  };
}