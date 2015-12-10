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

        // 初回起動時のチュートリアルを表示するかどうか
        if ("end" != window.localStorage.getItem("tutorial")) {
            $("#tutorial_page").show();
        } else {
            $("#shake_page").show();
        }
    });

    // 前回実行時の値をストレージから設定
    // TODO メール内容に置き換え
	var latitudeA = window.localStorage.getItem("latitudeA");
	if (latitudeA) {
		$("#latitudeA").text(latitudeA);
		$("#longitudeA").text(window.localStorage.getItem("longitudeA"));
	}

	var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };;

    // 振るイベントに変更
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

	// チュートリアルが終わった時の処理
	$("#tutorial_end").click(function() {
	    window.localStorage.setItem("tutorial", "end");
	});

    // 画面遷移処理
    $("a[href^='#']").click(function() {
        $(".panel").hide();
        document.location = $(this).attr("href");
        $($(this).attr("href")).show();
    });

    // 戻るボタン処理
    document.addEventListener("backbutton", function() {
        var anchorIndex = document.location.href.indexOf("#");
        if (anchorIndex < 0) {
            navigator.app.exitApp();
        }

        var anchor = document.location.href.substring(anchorIndex);
        if (anchor == "#tutorial_page" || anchor == "#shake_page") {
            navigator.app.exitApp();
        }

        window.history.back();
        function backBtn() {
            var prevAnchor = document.location.href.substring(anchorIndex);
            if (anchor == prevAnchor) {
                setTimeout(backBtn, 0);
                return;
            }

            $(".panel").hide();
            if (prevAnchor == "") {
                $("#shake_page").show();
            } else {
                $(document.location.href.substring(anchorIndex)).show();
            }
        }
        setTimeout(backBtn, 0);

    }, false);
}, false);