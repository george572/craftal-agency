export default function(eleventyConfig) {
  // Copy CSS files to output
  eleventyConfig.addPassthroughCopy("src/output.css");
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "components"
    }
  };
}; 