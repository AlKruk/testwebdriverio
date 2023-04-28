# shopByAutomation
Install framework - "npm install"
Run travel scenario with "npm run test"

## config
All config files, logger config files

## framework
1)Components.Includes components for pages and wrappers around elements. Components are used for definng common elemments, that might be reused on several pages, and related actions.

2)Features. Includes cucumber tests

3)Pageobjects. Contains page objects and pageFactory which returns pageObject, depending on currentUrl or name. Only url method is used in framework.
Simple elements represented by objects, that
include type of element and selector fields. Using getChild method from page element, collection, component, componentCollection element can be returned to perform actions.

4)Step_definitions. Contains description for gerkin steps, logic method calls and assertions.

5)SupportCode. Includes all business logic and some element actions.

## Utils.
Includes world object for using logger and custom timeout. Also includes custom matcher for jest framework to perform validation in expect method.
Lastly, includes hook to get screenshot in logger.

