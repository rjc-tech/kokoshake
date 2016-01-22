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

        // 設定画面の初期値を設定
	    $("#mailer").val(window.localStorage.getItem("mailer"));
	    $("#address").val(window.localStorage.getItem("address"));
	    $("#subject").val(window.localStorage.getItem("subject"));
        $("#body").val(window.localStorage.getItem("body"));
    });

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

        $(".panel").hide();
        document.location = "#shake_page";
        $("#shake_page").show();
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