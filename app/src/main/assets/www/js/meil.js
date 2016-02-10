var WebIntent = function() {

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";

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
        // test
        alert("addEventListener");

        var extras = {};
        extras[WebIntent.EXTRA_SUBJECT] = document.getElementById('subject').value;
        extras[WebIntent.EXTRA_TEXT] = document.getElementById('body').value;

        alert(extras[WebIntent.EXTRA_TEXT]);

        /* メール */
        window.plugins.webintent.startActivity({
            action: WebIntent.ACTION_SEND,
            type: 'text/plain',
            extras: extras
        }, function() {}, function() {alert('Failed to send email via Android Intent');});

        alert("open_mail end");
    });
}, false);
