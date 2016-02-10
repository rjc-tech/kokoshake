var WebIntent = function() {

};

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

document.addEventListener('deviceready', function() {
    $("#shake_me").on("click", function() {

        var extras = {};


        //extras[WebIntent.EXTRA_EMAIL] = window.localStorage.getItem("address");
        extras[WebIntent.EXTRA_EMAIL] = ["aaaa@co.jp"];
        extras[WebIntent.EXTRA_SUBJECT] = window.localStorage.getItem("subject");
        extras[WebIntent.EXTRA_TEXT] = window.localStorage.getItem("body");

        window.plugins.webintent.startActivity({
            action: WebIntent.ACTION_SEND,
            type: 'text/plain',
            extras: extras
        }, function() {}, function() {alert('Failed to send email via Android Intent');});

    });
    /*
    var GOOGLE_MAP_URL = "https://www.google.com/maps?q="
    var geolocationUtil = new GeolocationUtil(geoOptions);
    if (geolocationUtil.isUsable()) {
        var callback = function(locationInfo) {
            var latitude = locationInfo.latitude;
            var longitude = locationInfo.longitude;

            var mapUrl = GOOGLE_MAP_URL + latitude + ',' + longitude;

            // TODO メール送信処理
        }
        geolocationUtil.getLocationInfo(callback);
    }
    */
}, false);
