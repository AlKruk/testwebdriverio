const {setWorldConstructor, setDefaultTimeout} = require("cucumber");
const winston = require("../config/winston.config");
const timeouts = require("../config/timeouts");

class World {
	constructor({attach, parameters}) {
		this.attach = attach;
		this.parameters = parameters;
	}

	info(text) {
		winston.info(text);
	}

	error(text) {
		winston.error(text);
	}

}

setDefaultTimeout(timeouts.cucumberOptsTimeout);
setWorldConstructor(World);