document.addEventListener('deviceready', function() {
    // 連絡先機能を実装してください。
    $(".address").live("click", function(){
        alert("clickされたよ");
    });
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
        res += '<li><span class="address">' + contacts[i].displayName + '：' + contacts[i].emails[0]["value"] + '</span></li>';
    }
    res += "<ol>";
    document.getElementById('msg').innerHTML = res;
}

function onError() {
    alert('Error');
}