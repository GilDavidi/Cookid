const table = document.getElementById("Players");
const URL = window.location.origin;


$("document").ready(() => {
    $.get(`${URL}/game/getEndMissionDetails`)
        .done((result) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerHTML = "ניקוד";
            cell2.innerHTML = "שם תלמיד";
            cell3.innerHTML = "מספר קבוצה";
            let Players = JSON.stringify(result);
            Players = JSON.parse(Players);
            for (const key in Players){
                let pairs = Players[key].split(", ");
                pairs.forEach(pair => {
                    let parts = pair.split(" : ");
                    let name = parts[0];
                    let score = parts[1];
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);
                    cell1.innerHTML = score;
                    cell2.innerHTML = name;
                    cell3.innerHTML = key;
                });
            }
        })
        .fail((xhr, status, error) => {
            console.error("failed send to server" + error);
        });
});