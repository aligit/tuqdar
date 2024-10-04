import path from 'path';

export default {
  mode: {
    symbol: {
      inline: true,
      sprite: "public/sprite.symbol.svg",
      example: false,
      render: {
        scss: {
          dest: "src/styles/_sprite.scss",
          template: path.join(process.cwd(), "scripts", "sprite-template.mustache"),
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
            { name: 'removeTitle' },
            { name: 'removeDesc' },
            { name: 'removeDimensions' },
            { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
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
