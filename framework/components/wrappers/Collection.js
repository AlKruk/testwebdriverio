const Element = require("./Element");
const timeouts = require("../../../config/timeouts");

class Collection {
	constructor(selector) {
		this.selector = selector;
	}

	async get() {
		if  (!this.collection) {
			this.collection = await $$(this.selector);
		}
		return this;
	}

	async getElementByIndex(index) {
		await browser.waitUntil(async () => (await $$(this.selector)).length >= index + 1, {
			timeout: timeouts.defaultWaitForTimeout,
			timeoutMsg: `timeout: current collection ${this.selector} doesn't have enough elements - ${index}`
		});
		await this.get();
		const requiredEl = this.collection[index - 1];
		const wrappedElement = new Element(this.selector);
		wrappedElement.element = requiredEl;
		return wrappedElement;
	}

	async getElementByText(text) {
		await this.get();
		for (const element of this.collection) {
			if ((await element.getText()).includes(text)) {
				const wrappedElement = new Element(this.selector);
				wrappedElement.element = element;
				return wrappedElement;
			}
		}
		throw new Error(`No elements found by ${text} in ${this.selector}`);
	}

	async getText() {
		await this.get();
		return Promise.all(this.collection.map(async element => await element.getText()));
	}

}

module.exports = Collection;
