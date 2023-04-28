const {After, Status} = require("cucumber");
const cucumberJson = require("wdio-cucumberjs-json-reporter");

After(async (scenarioResult) => {
	if (scenarioResult.result.status === Status.FAILED) {
		const png = await browser.takeScreenshot();
		cucumberJson.default.attach(new Buffer(png, "base64").toString("base64"), "image/png", "after");
	}
	return scenarioResult.status;
});
