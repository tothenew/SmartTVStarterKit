(function () {

    var CONFIG = require('./config');
    var generic = {};

    setTimeout(function () {
        generic.getDeviceId();
    }, 2000);

    window.Network = {
        connected: window.navigator.onLine
    };

    generic.exit = function (widgetAPI, event) {
        window.close();
    };

    generic.getDeviceId=function(){
        if(CONFIG.uid){
            return CONFIG.uid;
        }
        webOS.service.request("luna://com.webos.service.sm", {
            method: "deviceid/getIDs",
            parameters: {
                "idType": ["LGUDID"]
            },
            onSuccess: function (inResponse) {
                if (inResponse && inResponse.returnValue) {
                    var deviceList = inResponse.idList;
                    if (deviceList && deviceList.length > 0) {
                        var deviceData = deviceList[0];
                        if (deviceData && deviceData.idValue) {
                            CONFIG.uid = deviceData.idValue;
                            return CONFIG.uid;
                        } else {
                            return generic.generateUDID_OS2();
                        }
                    } else {
                        return generic.generateUDID_OS2();
                    }
                } else {
                    return generic.generateUDID_OS2();
                }
            },
            onFailure: function (inError) {
                console.log("Failed to get system ID information");
                console.log("[" + inError.errorCode + "]: " + inError.errorText);
                return generic.generateUDID_OS2();
            }
        });
    };

    generic.generateUDID_OS2 = function () {
        try {
            var d = new Date().getTime();
            CONFIG.uid = webOS.device.platformVersion + "-" + d;
            return CONFIG.uid;
        }
        catch (e) {}
    };

    generic.getDeviceOS = function () {
        return "WebOS";
    };

    generic.getDevicePlatform = function () {
        return "LG";
    };

    generic.getAppVersion = function () {
        return CONFIG.APP_VERSION;
    };

    generic.getDevicePlatformVersion = function () {
        if(CONFIG.device_platform_version){
            return CONFIG.device_platform_version;
        }
        else {
            try {
                webOS.deviceInfo(function (device) {
                    var sdkVersion = device.sdkVersion;
                    CONFIG.device_platform_version=sdkVersion;
                    return sdkVersion;
                });
            }
            catch (err) {
                return "";
            }
        }
    };

    generic.getNetworkStatus = function () {
        return window.navigator.onLine;
    };


    module.exports = generic;
})();
