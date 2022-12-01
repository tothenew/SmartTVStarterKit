(function () {
    var CONFIG = require('./config');
    var generic = {};

    window.Network = {
        cType: null,
        contype: null,
        connected: true,
        connectionType: null
    };

    function init() {
        try {
            generic.UpdateConnectionType(undefined);
            webapis.network.addNetworkStateChangeListener(function (connectionType) {
                window.Network.connectionType = connectionType;
                generic.UpdateConnectionType(connectionType);
            });
        }
        catch (e) {
            console.log("webapis error ", e);
        }
    }

    setTimeout(function () {
        init();
    }, 2000);

    generic.getDeviceId = function () {
        if (CONFIG.uid) {
            return CONFIG.uid;
        }

        try {
            CONFIG.uid = tizen.systeminfo.getCapability('http://tizen.org/system/tizenid');
        }
        catch (err) {}
        if(!CONFIG.uid){
            CONFIG.uid='567457kfkdf';
        }
        return CONFIG.uid;
    };

    generic.getDeviceOS = function () {
        return "Tizen";
    };

    generic.getDevicePlatform = function () {
        return "SAMSUNG";
    };

    generic.exit = function () {
        tizen.application.getCurrentApplication().exit();
    };

    generic.getNetworkStatus = function () {
        return window.Network.connected;
    };

    generic.getAppVersion = function () {
        if (CONFIG.APP_VERSION) {
            return CONFIG.APP_VERSION;
        }
        else {
            try {
                CONFIG.APP_VERSION = tizen.application.getAppInfo().version;
                return CONFIG.APP_VERSION;
            }
            catch (err) {
                return CONFIG.APP_VERSION;
            }
        }
    };

    generic.getDevicePlatformVersion = function () {
        if (CONFIG.device_platform_version) {
            return CONFIG.device_platform_version;
        }
        else {
            try {
                var capability = tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version');
                CONFIG.device_platform_version = capability;
                return capability;
            }
            catch (err) {
                return CONFIG.device_platform_version;
            }
        }
    };

    generic.UpdateConnectionType = function (connectionType) {
        if (connectionType) {
            window.Network.cType = connectionType;
        } else {
            window.Network.cType = webapis.network.getActiveConnectionType();
        }
        switch (window.Network.cType) {
            case 0:
            case 5:
                window.Network.contype = "DISCONNECTED";
                window.Network.connected = false;
                break;
            case 1:
                window.Network.contype = "WIFI";
                window.Network.connected = true;
                break;
            case 2:
                window.Network.contype = "CELLULAR";
                window.Network.connected = true;
                break;
            case 3:
                window.Network.contype = "ETHERNET";
                window.Network.connected = true;
                break;
            case 4:
                window.Network.contype = "RECONNECTED";
                window.Network.connected = true;
                break;

            default:
                window.Network.contype = "Unknown";
                window.Network.connected = false;
                break;
        }
    };

    generic.screenSaverOnOff = function (mode) {
        try {
            if (mode === 'on') {
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON,
                    function (result) {
                        console.log(result);
                    }, function (error) {
                        console.log(error);
                    });
            }
            else {
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF,
                    function (result) {
                        console.log(result);
                    }, function (error) {
                        console.log(error);
                    });
            }
        }
        catch (err) {

        }
    };

    module.exports = generic;
})();
