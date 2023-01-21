const table = document.getElementById("Games");
const URL = window.location.origin;

$("document").ready(() => {
    $.get(`${URL}/previousGames/getAllPreviousGames`)
        .done((result) => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                cell1.innerHTML = "תאריך";
                cell2.innerHTML = "מספר קבוצה";
                cell3.innerHTML = "ניקוד התלמידים";
            result.forEach(function(item){
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                cell1.innerHTML = item.date;
                cell2.innerHTML = item.group_id;
                cell3.innerHTML = item.players_scores;
            });
        })
        .fail((xhr, status, error) => {
            console.error("failed send to server" + error);
        });
});
