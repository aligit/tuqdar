import fs from "fs";
import path from "path";
import SVGSpriter from "svg-sprite";
import config from "./svg-sprite.config.js";

// Initialize SVGSpriter with the configuration
const spriter = new SVGSpriter(config);

// Directory containing SVG icons
const iconsDir = path.join(process.cwd(), "public", "icons");

// Check if icons directory exists
if (!fs.existsSync(iconsDir)) {
  console.error(`Error: Icons directory "${iconsDir}" does not exist.`);
  process.exit(1);
}

// Read all SVG files from the icons directory and its subdirectories
function addSvgFiles(dir) {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      addSvgFiles(itemPath);
    } else if (path.extname(item).toLowerCase() === '.svg') {
      const svgContent = fs.readFileSync(itemPath, "utf8");
      spriter.add(itemPath, null, svgContent);
    }
  });
}

addSvgFiles(iconsDir);

// Compile the sprite
spriter.compile((error, result) => {
  if (error) {
    console.error("Error generating SVG sprite:", error);
    process.exit(1);
  }

  // Iterate over all modes and their resources
  for (const mode in result) {
    for (const resource in result[mode]) {
      const { info, path: resourcePath, contents } = result[mode][resource];
      
      // Adjust the path to be relative to the project root
      const adjustedPath = resourcePath.replace(/^.*?([^/]+\/[^/]+)$/, '$1');
      const fullPath = path.join(process.cwd(), adjustedPath);

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });

      // Write the file
      fs.writeFileSync(fullPath, contents);
      console.log(`Generated: ${fullPath}`);
    }
  }

  console.log("SVG sprite generation completed successfully.");
});
