var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };
var lastShaked = 0;

document.addEventListener('deviceready', function() {

    // ======== GPS機能 =========
    // navigator.geolocationの利用可否のチェック
    if (navigator.geolocation){
        function success(pos) {
            var crd = pos.coords;

            var latitude = crd.latitude;
            var longitude = crd.longitude;

            // TODO 取得した値どう渡すかなー？
        };

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, geoOptions);
    } else {
        // TODO アラート表示どうすんじゃー
        console.log("つかえないよー");
    }

    // ======== シェイク判定機能 =========
    // シェイクイベント利用可否チェック
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event){
            var x = event.accelerationIncludingGravity.x;

            if (x > 10) {
                // TODO とりあえず1秒間ロック
                if (new Date().getTime() - lastShaked > 1000) {
                    lastShaked = new Date().getTime();
                    // TODO シェイク判定OKなので、なんとかして結果を返す
                }
            }
        }, true);
    } else {
        // TODO アラート表示どうすんじゃー
        console.log("つかえないよー");
    }

}, false);