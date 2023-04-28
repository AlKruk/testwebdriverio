const timeouts = require('../../../config/timeouts')

class Element {
  constructor (selector, stablePart = []) {
    this.selector = selector
    this.stablePart = stablePart
  }

  async get() {
    if (!this.element) {
      console.log(`!!!!!!!${this.selector}`);
      this.element = await $(this.selector)
    }
    return this;
  }

  async click () {
    await this.get()
    await browser.waitUntil(async () => await this.element.isClickable(), {
      timeout: timeouts.defaultWaitForTimeout,
      timeoutMsg: `timeout: current element ${this.selector} is not clickable`
    })
    return this.element.click()
  }

  async sendKeys (keys) {
    await this.get()
    await this.click()
    return browser.keys(keys)
  }

  async getText () {
    await this.get()
    return this.element.getText()
  }

  async scrollIntoView (scrollOptions) {
    await this.get()
    return this.element.scrollIntoView(scrollOptions)
  }

  async waitUntilDisplayed (options) {
    await this.get()
    return this.element.waitForDisplayed(options)
  }

  async waitUntilClickable (options) {
    await this.get()
    return this.element.waitForClickable(options)
  }
}

module.exports = Element
