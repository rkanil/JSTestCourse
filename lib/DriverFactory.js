/**
 * Created by AnilRas on 4/4/2017.
 */
'use strict';
var webdriver = require('selenium-webdriver');
var config = require('./config');
var driver,
    sessionId;

function DriverFactory() {
    this.build();
}

DriverFactory.prototype.build = function () {
    var builder;
    if(config.host === 'saucelabs'){
        var url = 'http://ondemand.saucelabs.com:80/wd/hub';
        builder = new webdriver.Builder().usingServer(url);
        builder.withCapabilities({
            browserName: config.browser,
            'version': config.browserVersion,
            platform: config.platform,
            username: config.sauceUsername,
            accessKey: config.sauceAccessKey
        });
    }else if(config.host === 'localhost'){
        var vendorDirectory = process.cwd() + '/vendor';
        process.env.PATH = vendorDirectory + ";%PATH%";
        var builder = new webdriver.Builder().forBrowser(config.browser);
    }
    this.driver = builder.build();
    this.driver.getSession().then(function (sessionId) {
        //sessionId = sessionid.id_;
    });
};

DriverFactory.prototype.quit = function (testName) {
    if (config.host === 'saucelabs'){
        this.driver.executeScript('sauce:job-name='+ testName);
        this.driver.executeScript('sauce:job-result='+ testResult);
    }
    this.driver.quit().then(function () {
        if(config.host === 'saucelabs' && testResult === false){
            console.log('http://saucelabs.com/beta/tests'+ sessionId);
        }
    });
};

module.exports = DriverFactory;