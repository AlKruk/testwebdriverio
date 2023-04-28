const winston = require("winston");

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	exitOnError: false,

	transports: [
		new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
		new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
	],
});

module.exports = logger;
