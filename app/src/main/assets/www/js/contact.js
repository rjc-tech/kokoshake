document.addEventListener('deviceready', function() {
<<<<<<< Updated upstream
    // 連絡先機能を実装してください。
}, false);

function doAction(){
    var fstr = document.getElementById('input').value;
    var opt = new ContactFindOptions();
    opt.filter = fstr;
    var flds = ["displayName","emails"];
    var contact = navigator.contacts.find(flds,onSuccess,onError,opt);
}

function onSuccess(contacts) {
    var res = "<ol>";
    for (var i=0; i < contacts.length; i++) {
        res += '<li class="mail_info">' + contacts[i].displayName + '：[' + '<span class="address">' + contacts[i].emails[0]["value"] + '</span>]</li>';
        res += '<li class="mail_info">' + contacts[i].displayName + '：[' + '<span class="address">' + 'test1@gmail.com' + '</span>]</li>';
        res += '<li class="mail_info">' + contacts[i].displayName + '：[' + '<span class="address">' + 'test2@gmail.com' + '</span>]</li>';
    }
    $('#msg').html(res);
    $(".mail_info").on("click", function(){
        alert($(this).children(".address").text());
    });
}

=======
    // アドレス情報を表示
    $("#address_setting_link").click(function() {
        var fstr = "";
        var opt = new ContactFindOptions();
        opt.filter = fstr;
        // 複数件取得する場合のフラグ
        opt.multiple=true;
        var flds = ["displayName","emails"];
        var contact = navigator.contacts.find(flds,onSuccess,onError,opt);
    });
}, false);

// アドレス取得成功
function onSuccess(contacts) {
    var res = "<ol>";
    for (var i=0; i < contacts.length; i++) {
        res += '<a href="#setting_page"><li class="mail_info">' + contacts[i].displayName + '：[' + '<span class="mail_address">' + contacts[i].emails[0]["value"] + '</span>]</li></a>';
    }
    $('#address_message').html(res);
    $(".mail_info").on("click", function(){
        $('#address').val($(this).children(".mail_address").text());
    });
}

// アドレス取得失敗
>>>>>>> Stashed changes
function onError() {
    alert('Error');
}