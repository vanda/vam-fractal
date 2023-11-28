// Webpack entry point for import of V&A assets

// SASS entry point
import './assets/styles/vam-style.scss';

// Javascript entry point
import './assets/scripts/vam-scripts';

// Fractal HTML template
import './components/_preview-layouts/_preview-template.html';

// Helper function to import SVG assets
function requireAll(r) {
  r.keys().forEach((icon) => { // eslint-disable-line
    if (process.env.NODE_ENV !== 'production') {
      // console.log('V&A SVG asset: ', icon); // eslint-disable-line
    }
  });
}

// Import SVG assets
requireAll(require.context('./assets/svg/', true, /\.svg$/));
