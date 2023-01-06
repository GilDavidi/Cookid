
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('userId');
let userName = urlParams.get('userName');
let pupilDetail={};
 pupilDetail.id=userId;
 pupilDetail.name=userName;
const socket = io("http://localhost:3001");

$("document").ready(() => {
    $("h1").text(`היי, ${userName}`) ;
    socket.emit('pupilConnected',pupilDetail);
    socket.on('close',()=>  {
        $("h1").text(`המשתמש כבר מחובר בחלון אחר, אנא סגור חלון זה`) ;
        $("#waiting_message").text('');
        socket.disconnect();

    }
)


});
