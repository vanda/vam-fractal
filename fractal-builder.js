const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;
const builder = fractal.web.builder();

builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
builder.on('error', err => logger.error(err.message));

return builder.start().then(() => {
  logger.success('Fractal build complete');
});
