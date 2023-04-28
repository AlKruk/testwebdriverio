const { When } = require('cucumber')
const { browserSleep, navigateTo } = require('../supportCode/browserActions')
const timeouts = require('../../config/timeouts')
const {
  clickElementFromCollection,
  scrollToChild,
  clickOnChild,
  typeInChild,
  waitForChildBeingDisplayed,
  waitForChildBeingClickable
} = require('../supportCode/actions')

When(/^I open "([^"]+)" url/, async function (url) {
  return await navigateTo(url)
})

When(/^I wait for (\d+) seconds/, async function (seconds) {
  this.info(`Pausing for '${seconds}' seconds`)
  return await browserSleep(seconds)
})

When(/^I scroll to the (top of )?"([^"]*)" element/, async function (align, element) {
  this.info(`I scroll to the '${align ? 'top of ' : ''}''${element}'`)
  return await scrollToChild(element, align === 'top of ')
})

When(/^I click on "([^"]*)" element$/, async function (element) {
  this.info(`i click on the '${element}'`)
  return await clickOnChild(element)
})

When(/^I type "([^"]*)" in "([^"]*)"$/, async function (text, element) {
  this.info(`i type '${text}' in '${element}'`)
  return await typeInChild(element, text)
})

When(/^I click on "([^"]*)" element from "([^"]*)"$/, async function (text, collection) {
  this.info(`i click on the '${text}' element from '${collection}' collection`)
  return await clickElementFromCollection(collection, text)
})

When(/^I wait until "([^"]*)" is( not)? (displayed|clickable)$/, async function (element, notArg, condition) {
  this.info(`i wait until '${element}' is ${notArg ? 'not ' : ''}${condition}}`)
  switch (condition) {
    case 'displayed':
      await waitForChildBeingDisplayed(element, {
        reverse: Boolean(notArg),
        timeout: timeouts.defaultWaitForTimeout
      })
      break
    case 'clickable':
      await waitForChildBeingClickable(element, {
        reverse: Boolean(notArg),
        timeout: timeouts.defaultWaitForTimeout
      })
  }
})
