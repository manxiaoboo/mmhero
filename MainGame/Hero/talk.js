/**
 * Created by MM on 2015/12/10 0010.
 */
var _sioClient;
var SocketIO = SocketIO || io;
window.onload = function(){
    _sioClient = SocketIO.connect("http://mmhero.picp.net:3000", {"force new connection" : false});
    _sioClient.emit("refreshSocket",sessionStorage.getItem("currentHero"));

    _sioClient.on('receiveTalk',function(data){
        document.getElementById('talkContent').value = document.getElementById('talkContent').value+"\n"+data;
    });
}
function dosubmit(){
        _sioClient.emit("sendTalk",{name:sessionStorage.getItem('currentHero'),text:document.getElementById('talkInput').value});
        document.getElementById('talkInput').value = "";
}

