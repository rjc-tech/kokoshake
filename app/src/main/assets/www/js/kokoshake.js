var msgJp;
var geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

document.addEventListener('deviceready', function() {

    var geolocationUtil = new GeolocationUtil(geoOptions);
    var shakeDetectionUtil = new ShakeDetectionUtil(geoOptions);

    $.getJSON("messages/msg_jp.json").done(function (data){
        msgJp = data;

        // GPS機能可否チェック
        if (!geolocationUtil.isUsable()) {
            alert(msgJp.system.canNotUse);
            navigator.app.exitApp();
        }
        // シェイク判定機能可否チェック
        if (!shakeDetectionUtil.isUsable()) {
            alert(msgJp.system.canNotUse);
            navigator.app.exitApp();
        }
        // localstrage機能可否チェック
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

        // 設定画面の初期値を設定
	    $("#mailer").val(window.localStorage.getItem("mailer"));
	    $("#address").val(window.localStorage.getItem("address"));
	    $("#subject").val(window.localStorage.getItem("subject"));
        $("#body").val(window.localStorage.getItem("body"));
    });

    // 前回実行時の値をストレージから設定
    // TODO メール内容に置き換え
	var latitudeA = window.localStorage.getItem("latitudeA");
	if (latitudeA) {
		$("#latitudeA").text(latitudeA);
		$("#longitudeA").text(window.localStorage.getItem("longitudeA"));
	}

    // シェイクイベントのハンドリング
 　 if (shakeDetectionUtil.isUsable()) {
        // TODO 動作確認用のcallback関数
        // メール送信機能に差し替えてください
        var callback = function() {
            alert("シェイクされたよ！！");
        }
        shakeDetectionUtil.shakeHandling(callback);
    }

	// チュートリアルが終わった時の処理
	$("#tutorial_page").click(function() {
	    if (window.localStorage.getItem("tutorial") != "end") {
            window.localStorage.setItem("tutorial", "end");
            window.localStorage.setItem("subject", "いまここにいます");
            window.localStorage.setItem("body", "いまここにいます");
            $("#subject").val(window.localStorage.getItem("subject"));
            $("#body").val(window.localStorage.getItem("body"));
	    }
	});

	// 登録ボタンを押した時の処理
	$("#register").click(function() {
	    // TODO エラーチェック
	    window.localStorage.setItem("mailer", $("#mailer").val());
	    window.localStorage.setItem("address", $("#address").val());
	    window.localStorage.setItem("subject", $("#subject").val());
        window.localStorage.setItem("body", $("#body").val());
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
        if (anchor == "#shake_page") {
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