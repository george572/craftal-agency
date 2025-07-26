export default function(eleventyConfig) {
  // Copy CSS files to output
  eleventyConfig.addPassthroughCopy("src/output.css");
  // Copy images to output
  eleventyConfig.addPassthroughCopy("src/images");
  // Copy fonts to output
  eleventyConfig.addPassthroughCopy("src/fonts");
  // Copy JavaScript files to output
  eleventyConfig.addPassthroughCopy("*.js");
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "components"
    }
  };
}; 