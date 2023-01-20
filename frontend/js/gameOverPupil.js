let urlParams = new URLSearchParams(window.location.search);
let similarity = urlParams.get('similarity');
document.getElementById("paint").innerHTML=` הציור שציירתם
         דומה ב  ${similarity} אחוזים 
            לציור המבוקש`;

