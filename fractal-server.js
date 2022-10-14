const fractal = require('./fractal.config.js');
const logger = fractal.cli.console;
const server = fractal.web.server();

server.on('error', err => logger.error(err.message));

return server.start().then(() => {
  logger.success(`Fractal online at: ${server.url}\n  ________________________________________\n`);
});
