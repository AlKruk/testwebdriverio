const {ensureDir} = require("fs-extra");
const {generate} = require("multiple-cucumber-html-reporter");
const yargs = require("yargs")
	.option("tags", {
		describe: "tags for specific suite or test run"
	}).option("chromeInstances",{
		describe: "max amount of instances for chrome, overrides instances"
	}).option("instances",{
		describe: "max amount of instances"
	}).argv;

const timeouts = require("./timeouts");

exports.config = {
	// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
	// on a remote machine).
	runner: "local",
	// Define which framework specs should run. The pattern is relative to the directory
	// from which `wdio` was called. Notice that, if you are calling `wdio` from an
	// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
	// directory is where your package.json resides, so `wdio` will be called from there.
	//
	specs: [
		"./framework/features/**/*.feature"
	],
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several framework
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same framework should run tests.
	//
	 maxInstances: yargs.instances || 1,
	//
	// If you have trouble getting all important capabilities together, check out the
	// Sauce Labs platform configurator - a great tool to configure your capabilities:
	// https://docs.saucelabs.com/refere nce/platforms-configurator
	//
	dockerOptions: {
		image: 'selenium/standalone-chrome',
		healthCheck: 'http://localhost:4444/wd/hub',
		options: {
			p: ['4444:4444'],
			shmSize: '2g'
		}
	},
	capabilities: [{
		//
		// // maxInstances can get overwritten per capability. So if you have an in-house Selenium
		// // grid with only 5 firefox instances available you can make sure that not more than
		// // 5 instances get started at a time.
		// maxInstances: yargs.chromeInstances || 1,
		// //
		browserName: "chrome",
		"goog:chromeOptions": {
			args: [
				"--start-maximized",
				"--disable-extensions",
				"--disable-infobars",
				"--no-sandbox"
			],
			prefs: {
				"credentials_enable_service": false,
				"profile": {
					"password_manager_enabled": false
				}
			}
		},
		// // If outputDir is provided WebdriverIO can capture driver session logs
		// // it is possible to configure which logTypes to include/exclude.
		// // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
		// // excludeDriverLogs: ['bugreport', 'server'],
		// 'maxInstances': 5,
	}],
	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: "info",

	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	baseUrl: "shop.by",
	//
	// Default timeout for all waitFor* commands.
	waitforTimeout: timeouts.defaultWaitForTimeout,
	//
	// Default timeout in milliseconds for request
	// if browser driver or grid doesn't send responsqq
	connectionRetryTimeout: timeouts.connectionRetryTimeout,
	//
	// Default request retries count
	connectionRetryCount: 0,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your framework setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the framework process.
	services: ['docker'],

	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks.html
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: "cucumber",
	cucumberOpts: {
		timeout: timeouts.cucumberOptsTimeout,
		dryRun: false,
		backtrace: false,
		strict: false,
		retry: 0,
		failFast: false,
		snippets: true,
		source: true,
		profile: [],
		format: [],
		ignoreUndefinedDefinitions: false,
		tagExpression: yargs.tags || "@MY",
		require: ["./framework/step_definitions/**/*.js", "./utils/*.js"]
	},
	//
	// The number of times to retry the entire specfile when it fails as a whole
	// specFileRetries: 1,
	//
	// Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
	// specFileRetriesDeferred: false,
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter.html
	reporters: [["cucumberjs-json", {jsonFolder: "reports/json/"}]],
	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the framework process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
	onPrepare: async function (config, capabilities) {
		await ensureDir("./reports");
	},

	/**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the framework.
     * @param {Number} result 0 - framework pass, 1 - framework fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
	after: async function (result, capabilities, specs) {
		await browser.closeWindow();
	},
	/**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the framework run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing framework results
     */
	onComplete: function (exitCode, config, capabilities, results) {
		generate({
			jsonDir: "reports/json/",
			reportPath: "reports/report/",
		});
	}
};
