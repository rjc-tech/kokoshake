var msgJp;

document.addEventListener('deviceready', function() {

    $.getJSON("messages/msg_jp.json").done(function (data){
        msgJp = data;

        // 端末の機能チェック
        if (!navigator.geolocation) {
            alert(msgJp.system.canNotUse);
            navigator.app.exitApp();
        }

        if (!window.localStorage) {
            alert(msgJp.system.canNotUse);
            navigator.app.exitApp();
        }
    });

    // 前回実行時の値をストレージから設定
	var latitudeA = window.localStorage.getItem("latitudeA");
	if (latitudeA) {
		$("#latitudeA").text(latitudeA);
		$("#longitudeA").text(window.localStorage.getItem("longitudeA"));
	}

	var latitudeB = window.localStorage.getItem("latitudeB");
	if (latitudeB) {
		$("#latitudeB").text(latitudeB);
		$("#longitudeB").text(window.localStorage.getItem("longitudeB"));
	}

	setDistance();

	var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

	// ボタン押下時のレイアウトチェンジ
	$("#btnA").bind("touchstart", function() {changeImage("btnA","./img/a_button_onClick.png");});
	$("#btnA").bind("touchend", function() {changeImage("btnA","./img/a_button.png");});
	$("#btnB").bind("touchstart", function() {changeImage("btnB","./img/b_button_onClick.png");});
	$("#btnB").bind("touchend", function() {changeImage("btnB","./img/b_button.png");});
	$("#btnR").bind("touchstart", function() {changeImage("btnR","./img/clear_button_onClick.png");});
	$("#btnR").bind("touchend", function() {changeImage("btnR","./img/clear_button.png");});

	$("#btnA").click(function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			window.localStorage.setItem("latitudeA", position.coords.latitude);
			window.localStorage.setItem("longitudeA", position.coords.longitude);
			$("#latitudeA").text(position.coords.latitude);
			$("#longitudeA").text(position.coords.longitude);
			setDistance();
		},
		function(e) {
			$("#message").text(msgJp.location.unknownA);
		}, geoOptions);
	});

	$("#btnB").click(function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			window.localStorage.setItem("latitudeB", position.coords.latitude);
			window.localStorage.setItem("longitudeB", position.coords.longitude);
			$("#latitudeB").text(position.coords.latitude);
			$("#longitudeB").text(position.coords.longitude);
			setDistance();
		},
		function(e) {
			$("#message").text(msgJp.location.unknownB);
		}, geoOptions);
	});

	$("#btnR").click(function() {
		$("#latitudeA").text("");
		$("#longitudeA").text("");
		$("#latitudeB").text("");
		$("#longitudeB").text("");
		$("#distance").text("");
		$("#message").text("");
		window.localStorage.clear();
	});

    // 距離を計算して設定する
    function setDistance() {
        if ($("#latitudeA").text() == "" || $("#latitudeB").text() == "") {
            return;
        }

        var positionA = {};
        var positionB = {};
        positionA["latitude"] = $("#latitudeA").text();
        positionA["longitude"] = $("#longitudeA").text();
        positionB["latitude"] = $("#latitudeB").text();
        positionB["longitude"] = $("#longitudeB").text();

        $("#distance").text(geolib.getDistance(positionA, positionB) + " (m)");
    }

    // 画像差し替え用処理
    function changeImage( imgid , newimg ) {
       $("#" + imgid).attr("src", newimg);
    }
}, false);