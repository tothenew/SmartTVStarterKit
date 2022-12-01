(function () {
    try {
        tizen.tvinputdevice.registerKey("1");
        tizen.tvinputdevice.registerKey("2");
        tizen.tvinputdevice.registerKey("3");
        tizen.tvinputdevice.registerKey("4");
        tizen.tvinputdevice.registerKey("5");
        tizen.tvinputdevice.registerKey("6");
        tizen.tvinputdevice.registerKey("7");
        tizen.tvinputdevice.registerKey("8");
        tizen.tvinputdevice.registerKey("9");
        tizen.tvinputdevice.registerKey("0");
        tizen.tvinputdevice.registerKey('MediaPlay');
        tizen.tvinputdevice.registerKey('MediaPause');
        tizen.tvinputdevice.registerKey('MediaPlayPause');
        tizen.tvinputdevice.registerKey('MediaFastForward');
        tizen.tvinputdevice.registerKey('MediaRewind');
        tizen.tvinputdevice.registerKey('MediaStop');
    }
    catch (e) {
        
    }
    var KEY = {};
    KEY.LEFT = 37;
    KEY.UP = 38;
    KEY.RIGHT = 39;
    KEY.DOWN = 40;
    KEY.ENTER = 13;
    KEY.BACK_WEB = 8;
    KEY.BACK = 10009;
    KEY.KEY_BOARD_HIDE = 65385;
    KEY.DONE = 65376;
    KEY.FORWARD = 417;
    KEY.REWIND = 412;
    KEY.PAUSE = 19;
    KEY.PLAY = 415;
    KEY.PLAY_PAUSE = 10252;
    KEY.STOP = 413;
    KEY.NEXT = 10233;

    module.exports = KEY;
})();
