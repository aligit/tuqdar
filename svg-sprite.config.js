export default {
  mode: {
    symbol: {
      // Activate the «symbol» mode
      inline: true, // Enable inline usage
      sprite: "sprite.symbol.svg", // Sprite file name
      example: false, // Disable the example HTML
      render: {
        scss: {
          dest: "../../src/styles/_sprite.scss", // Path to generated SCSS
          template: "scripts/sprite-template.mustache", // Path to the Mustache template
        },
      },
    },
  },
  shape: {
    id: {
      generator: function (name) {
        // Remove path and extension, keep name
        return path.basename(name, ".svg");
      },
    },
    transform: [
      {
        svgo: {
          plugins: [
            { removeTitle: true },
            { removeDesc: true },
            { removeDimensions: true },
            { removeAttrs: { attrs: "(fill|stroke)" } },
          ],
        },
      },
    ],
  },
  svg: {
    xmlns: "http://www.w3.org/2000/svg",
    style: "display: none;",
  },
};
