/**
 * メール送信情報から、メーラーを立ち上げる.
 */
function createMail(address, subject, body) {
    var WebIntent = function() {};

    WebIntent.ACTION_SEND = "android.intent.action.SEND";
    WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
    WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
    WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
    WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

    WebIntent.prototype.startActivity = function(params, success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'WebIntent', 'startActivity', [params]);
    };

    WebIntent.prototype.hasExtra = function(params, success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'WebIntent', 'hasExtra', [params]);
    };

    WebIntent.prototype.getExtra = function(params, success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'WebIntent', 'getExtra', [params]);
    };

    WebIntent.prototype.getDataString = function(success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'WebIntent', 'getDataString', []);
    };

    cordova.addConstructor(function() {
        window.webintent = new WebIntent();
        // backwards compatibility
        window.plugins = window.plugins || {};
        window.plugins.webintent = window.webintent;
    });

    var extras = {};

    extras[WebIntent.EXTRA_EMAIL] = address;
    extras[WebIntent.EXTRA_SUBJECT] = subject;
    extras[WebIntent.EXTRA_TEXT] = body;

    window.plugins.webintent.startActivity({
        action: WebIntent.ACTION_SEND,
        type: 'text/plain',
        extras: extras
    }, function() {}, function() {alert('Failed to send email via Android Intent');});
}
/**
 * メール送信処理
 */
function sendMail() {
    var GOOGLE_MAP_URL = "https://www.google.com/maps?q=";
    var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

    var geolocationUtil = new GeolocationUtil(geoOptions);
    if (geolocationUtil.isUsable()) {
        var callback = function(locationInfo) {
            // 位置情報取得
            var latitude = locationInfo.latitude;
            var longitude = locationInfo.longitude;
            var mapUrl = GOOGLE_MAP_URL + latitude + ',' + longitude;

            var address = window.localStorage.getItem("address");
            var subject = window.localStorage.getItem("subject");
            var body = window.localStorage.getItem("body");
            body = body + mapUrl;

            createMail(address, subject, body);
        }
        geolocationUtil.getLocationInfo(callback);
    }

}
