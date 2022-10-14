'use strict';

const paths = {
  // HTML build destination : Fractal 'builder' deployment for Surge publication
  pub: `${__dirname}/www`,
  // local development build destination : Fractal 'static' deployment
  static: `${__dirname}/dev`,
  // local source files
  src: `${__dirname}/src`,
  components: `${__dirname}/src/components`,
  docs: `${__dirname}/src/docs`
};

const buildDir = 'dev';

// Required modules
const fractal = module.exports = require('@frctl/fractal').create();

// Project config.
fractal.set('project.title', 'V&A Front-end Components');
fractal.set('project.buildDir', buildDir);

// Component config.
fractal.components.set('path', paths.components);
fractal.components.set('default.status', null);
fractal.components.set('default.preview', '@preview');
fractal.components.set('ext', '.html');

// Documentation pages
fractal.docs.set('ext', '.md');
fractal.docs.set('path', paths.docs);

// Web UI config.
fractal.web.set('server.port', 3001);
fractal.web.set('server.sync', true);

// Local development environment
fractal.web.set('static.path', paths.static);
fractal.web.set('static.mount', 'dev');

// Distribution environment
fractal.web.set('builder.dest', paths.pub);
fractal.web.set('builder.urls.ext', null);

// Templating config.
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

fractal.components.engine(nunjucks);
