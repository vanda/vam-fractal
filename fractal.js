const paths = {
  build: `${__dirname}/www`,
  src: `${__dirname}/src`,
  static: `${__dirname}/tmp`,
};

const fractal = require('@frctl/fractal').create();

// Theme for the page
const mandelbrot = require('@frctl/mandelbrot')({
  lang: 'en-gb',
  skin: 'lime',
  nav: ['docs', 'components'],
  panels: ['notes', 'html', 'context', 'resources', 'info'],
  static: {
    mount: 'fractal',
  },
});

// Nunjucks setup (Templating like Jinja2)
const nunjucks = require('@frctl/nunjucks')({
  filters: {
    markdown(str) {
      return md.render(str);
    },
    markdownInline(str) {
      return md.renderInline(str);
    },
    slugify(str) {
      return str.toLowerCase().replace(/[^\w]+/g, '');
    },
    stringify() {
      return JSON.stringify(this, null, '\t');
    }
  }
});

// Project config
fractal.set('project.title', 'V&A Visual Style Guide');

// Component config
fractal.components.engine(nunjucks);
fractal.components.set('path', `${paths.src}/components`);
fractal.components.set('default.status', null);
fractal.components.set('default.preview', '@preview');
fractal.components.set('ext', '.html');

// Docs config
fractal.docs.set('ext', '.md');
fractal.docs.set('path', `${paths.src}/docs`);

// Web UI config
fractal.web.theme(mandelbrot);
fractal.web.set('server.port', 8000);
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);
fractal.web.set('builder.urls.ext', null);

// Export config
module.exports = fractal;
