document.addEventListener('deviceready', function() {
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

function onError() {
    alert('Error');
}