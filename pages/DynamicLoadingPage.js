/**
 * Created by AnilRas on 4/3/2017.
 */
'use strict'
var BasePage = require('./BasePage');

var START_BUTTON = {css:'#start button'};
var FINISH_TEXT = {id:'finish'};

function DynamicLoadingPage(driver){
    BasePage.call(this, driver);
}

DynamicLoadingPage.prototype = Object.create(BasePage.prototype);
DynamicLoadingPage.prototype.constructor = DynamicLoadingPage;

DynamicLoadingPage.prototype.loadExample = function (exampleNumber) {
    this.visit('/dynamic_loading/' + exampleNumber);
    this.click(START_BUTTON);
};

DynamicLoadingPage.prototype.finishTextPresent = function () {
    return this.waitForIsDisplayed(FINISH_TEXT, 10000);
};

module.exports = DynamicLoadingPage;