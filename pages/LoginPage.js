/**
 * Created by AnilRas on 4/3/2017.
 */
'use strict';
var BasePage = require('./BasePage');
var sleep = require('sleep');
var assert = require('assert');

var driver;
var LOGIN_FORM = {id:'login'};
var USERNAME_INPUT = {id:'username'};
var PASSWORD_INPUT = {id:'password'};
var SUBMIT_BUTTON = {css:'button'};
var SUCCESS_MESSAGE = {css:'.flash.success'};
var FAILURE_MESSAGE = {css:'.flash.error'};

function LoginPage(driver){ //class - constructor
    BasePage.call(this, driver);
    this.visit('/login');
    this.isDisplayed(LOGIN_FORM).then(function (elementDisplayed) {
        assert.equal(elementDisplayed, true, 'Login form not loaded');
    });
}

LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.with = function (username, password) {
    this.type(USERNAME_INPUT, username);
    this.type(PASSWORD_INPUT, password);
    this.click(SUBMIT_BUTTON); //sleep not needed as 'waitForIsDisplayed' is used in following methods
    /*.then(function() {
        sleep.msleep(5);
    });*/
};

LoginPage.prototype.successMessagePresent = function () {
    this.waitForIsDisplayed(SUCCESS_MESSAGE, 2000);
    return this.isDisplayed(SUCCESS_MESSAGE);
};

LoginPage.prototype.failureMessagePresent = function () {
    this.waitForIsDisplayed(FAILURE_MESSAGE, 2000);
    return this.isDisplayed(FAILURE_MESSAGE);
};

module.exports = LoginPage;