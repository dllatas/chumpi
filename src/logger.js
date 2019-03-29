const { createLogger, format, transports } = require('winston');

const logger = (service) => {
  const createdLogger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service },
    transports: [
      new transports.File({ filename: `/tmp/${service}-error.log`, level: 'error' }),
      new transports.File({ filename: `/tmp/${service}-combined.log` }),
    ],
  });

  if (process.env.NODE_ENV === 'development') {
    createdLogger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }));
  }

  return createdLogger;
};


module.exports = logger;
