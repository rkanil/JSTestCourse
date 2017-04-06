/**
 * Created by AnilRas on 4/4/2017.
 */
module.exports = {
  baseUrl: process.env.BASE_URL || 'http://the-internet.herokuapp.com',
    browser: process.env.BROWSER || 'chrome',

    host: process.env.HOST || 'localhost',
    browserVersion: process.env.BROWSER_VERSION || '11.0',
    platform: process.env.PLATFORM || 'Windows 7',
    sauceUsername: process.env.SAUCE_USERNAME,
    sauceAccessKey: process.env.SAUCE_ACCESS_KEY
};