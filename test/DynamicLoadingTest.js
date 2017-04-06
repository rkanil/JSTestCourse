/**
 * Created by AnilRas on 4/4/2017.
 */
'use strict';
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var BaseTest = require('./BaseTest');
var DynamicLoadingPage = require('../pages/DynamicLoadingPage');

test.describe('Dynamic Loading @deep', function () {
    this.timeout(global.testTimeout);
    var dynamicLoading;

    test.beforeEach(function () {
        //driver = new webdriver.Builder().forBrowser('chrome').build(); -- moved to BaseTest
        dynamicLoading = new DynamicLoadingPage(global.driver);
    });

/*    test.afterEach(function () {
        driver.quit();
    });*/ // -- moved to BaseTest

    test.it('hidden element', function () {
        dynamicLoading.loadExample('1');
        dynamicLoading.finishTextPresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed, true, 'Finish text not displayed');
        });
    });

    test.it('rendered element', function () {
        dynamicLoading.loadExample('2');
        dynamicLoading.finishTextPresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed, true,'Finish text not displayed');
        });
    });
});