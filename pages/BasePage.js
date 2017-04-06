/**
 * Created by AnilRas on 4/3/2017.
 */
'use strict';

var driver,
    Promise = require('selenium-webdriver').promise,
    Until = require('selenium-webdriver').until,
    config = require('../lib/config');

function BasePage(driver){
    this.driver = driver;
}

BasePage.prototype.visit = function (url) {
    if(url.startsWith('http')){
        this.driver.get(url);
    }else {
        this.driver.get(config.baseUrl + url);
    }
};

BasePage.prototype.find = function(locator){
  return this.driver.findElement(locator);
};

BasePage.prototype.click = function (locator) {
    return this.find(locator).click();
};

BasePage.prototype.type = function (locator, inputText) {
  this.find(locator).sendKeys(inputText );
};

BasePage.prototype.isDisplayed = function (locator) {
    var defer = Promise.defer();
    this.find(locator).isDisplayed().then(function (isDisplayed) {
        defer.fulfill(isDisplayed);
    },function (error) {
        if (error.name === 'NoSuchElementError') {
            defer.fulfill(false);
        }else{
            defer.reject(error);
        }
    });
    return defer.promise;
};

BasePage.prototype.waitForIsDisplayed = function (locator, timeout) {
    var defer = Promise.defer();
    var driver = this.driver;
    driver.wait(Until.elementLocated(locator), timeout).then(function () {
       var element = driver.findElement(locator);
       driver.wait(Until.elementIsVisible(element), timeout).then(function () {
           defer.fulfill(true);
       }, function (error) {
           if (error.name === 'NoSuchElementError') {
               defer.fulfill(false);
           }else{
               defer.reject(error);
       }
       });
    });
    return defer.promise;
};

module.exports = BasePage;