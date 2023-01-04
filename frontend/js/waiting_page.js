let urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get('userName');

$("document").ready(() => {
    $("h1").text(`היי, ${userName}`) ;

});
