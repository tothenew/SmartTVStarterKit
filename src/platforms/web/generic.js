(function () {
    var CONFIG = require('./config');
    var generic = {};

    window.Network = {
        connected: window.navigator.onLine
    };

    generic.exit = function (widgetAPI, event) {
        window.close();
    };

    generic.getDeviceId=function(){
          return 'xxuio980fg23';
    };

    generic.getDeviceOS = function () {
        return "web";
    };

    generic.getDevicePlatform = function () {
        return 'web';
    };

    generic.getNetworkStatus = function () {
        return window.Network.connected||window.navigator.onLine;
    };

    generic.getAppVersion = function () {
        return CONFIG.APP_VERSION;
    };

    generic.getDevicePlatformVersion = function () {
        return '1.0.0';
    };

    module.exports = generic;
})();
