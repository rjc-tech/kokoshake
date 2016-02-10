/**
 * GPS機能Utilクラス.
 *
 * ################## Examples Of Use #################
 * # var geoOptions = {maximumAge: 3000,timeout: 10000,enableHighAccuracy: true};
 * # var geolocationUtil = new GeolocationUtil(geoOptions);
 * # if (geolocationUtil.isUsable()) {
 * #   var callback = function(locationInfo) {
 * #     console.log(locationInfo);
 * #   }
 * #   geolocationUtil.getLocationInfo(callback);
 * # }
 * ####################################################
 */
function GeolocationUtil(geoOptions) {
	this.geoOptions = geoOptions;
}
GeolocationUtil.prototype = {
	isUsable: function(){
		return navigator.geolocation ? true : false;
	},
	getLocationInfo: function(callback){
		function success(pos) {
		    var crd = pos.coords;

			var locationInfo = {
				latitude: crd.latitude,
				longitude: crd.longitude,
				altitude: crd.altitude,
				accuracy: crd.accuracy,
				altitudeAccuracy: crd.altitudeAccuracy,
				heading: crd.heading,
				speed: crd.speed
			};

			if (typeof callback == 'function'){
				callback(locationInfo);
			}
		};

		function error(err) {
		    console.warn('ERROR(' + err.code + '): ' + err.message);
		};

		navigator.geolocation.getCurrentPosition(success, error, this.geoOptions);
	}
}

/**
 * シェイク判定Utilクラス.
 *
 * ################## Examples Of Use #################
 * # var geoOptions = {maximumAge: 3000,timeout: 10000,enableHighAccuracy: true};
 * # var shakeDetectionUtil = new ShakeDetectionUtil(geoOptions);
 * # if (shakeDetectionUtil.isUsable()) {
 * #   var callback = function() {
 * #     console.log("シェイクされたよ！！");
 * #   }
 * #   shakeDetectionUtil.shakeHandling(callback);
 * # }
 * ####################################################
 */
function ShakeDetectionUtil(geoOptions) {
	this.geoOptions = geoOptions;
	this.lastShaked = 0;
}
ShakeDetectionUtil.prototype = {
	isUsable: function(){
		return window.DeviceMotionEvent ? true : false;
	},
	shakeHandling: function(callback){
		window.addEventListener("devicemotion", function(event){
			var x = event.accelerationIncludingGravity.x;

			if (x > 10) {
				// 連続しないように1秒間ロック
				if (new Date().getTime() - this.lastShaked > 1000) {
				    this.lastShaked = new Date().getTime();

				    if (typeof callback == 'function'){
						callback();
					}
				}
			}
		}, true);
	}
}