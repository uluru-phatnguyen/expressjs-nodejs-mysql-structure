const path = require('path');
const moment = require('moment');
const winston = require('winston');
const { format, transports, createLogger } = winston;
const { combine, timestamp, label, printf } = format;
const { logs } = require('../config/index');

// Path logs
const logDir = logs?.dir || path.join(__dirname, '/../', process.env.LOG_DIR || 'logs');

// Disabled logs
const logSilent = (logs?.silent === 'true' || logs?.silent === true) ? true : false;

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Chose the aspect of your log customizing the log format.
const formatLog = combine(
  // json(),
  // Add the message timestamp with the preferred format
  timestamp(),
  label(),
  // Tell Winston that the logs must be colored
  // colorize(),
  // Define the format of the message showing the timestamp, the level and the message
  printf(
    (info) => {
      return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}\n${info?.stack}`;
    },
  ),
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const winTransports = [
  // Allow the use the console to print the messages
  new transports.Console({
    silent: logSilent,
  }),
  // Allow to print all the error level messages inside the error.log file
  // filename: `NI-error-${moment().format("YYYYMMDD")}.log`,
  new transports.File({
    filename: path.join(logs.dir, `DI-error-${moment().format('YYYYMMDD')}.log`),
    level: 'error',
    silent: logSilent,
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new transports.File({
    filename: path.join(logDir, `DI-debug-${moment().format('YYYYMMDD')}.log`),
    silent: logSilent,
  }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = createLogger({
  level: logs?.level || 'debug',
  levels,
  format: formatLog,
  transports: winTransports,
  silent: logSilent,
});

module.exports = Logger;
