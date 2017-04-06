/**
 * Created by AnilRas on 3/31/2017.
 */
'use strict';
//var webdriver = require('selenium-webdriver'); //webdriver component -- moved to BaseTest
var test = require('selenium-webdriver/testing'); //mocha selenium wrapper or component -- test
var assert = require('assert');
var BaseTest = require('./BaseTest');
var LoginPage = require('../pages/LoginPage');

test.describe('Login', function(){
    this.timeout(global.testTimeout);
    //var driver; -- moved to BaseTest
    var login;

    test.beforeEach(function(){
        //driver = new webdriver.Builder().forBrowser('chrome').build(); -- moved to BaseTest
        login = new LoginPage(global.driver);
    });

/*    test.afterEach(function(){
       driver.quit();
    });*/ //moved to BaseTest

    test.it('with valid credentials @shallow', function(){
        login.with('tomsmith','SuperSecretPassword!');
        login.successMessagePresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed, true, 'Success message not displayed');
        });
    });

    test.it('with invalid credentials @deep', function(){
        login.with('tomsmith','bad Password');
        login.failureMessagePresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed, true, 'Failure message not displayed');
        });
    });

    test.it('forced failure @shallow', function () {
        login.with('tomsmith', 'bad password');
        login.successMessagePresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed,true,'success message displayed');
        });
    });

/*    test.it('with invalid credentials', function() {
        login.with('tomsmith', 'bad Password');
        login.successMessagePresent().then(function (elementDisplayed) {
            assert.equal(elementDisplayed, false, 'Success message displayed');
        });
    });*/

});