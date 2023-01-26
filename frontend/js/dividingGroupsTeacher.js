const socket = io();
const URL = window.location.origin;


socket.emit('teacherConnected');

socket.on('gameControlPage',link=>{window.location.replace(link)});


$("document").ready(() => {

    let table = document.getElementById('student-table');
    const isStudentExist =(name) =>
    {
        const rows = table.querySelectorAll('tr');
        for (const row of rows) {
            if (row.textContent.includes(name)) {
               return true;
            }
        }
        return false;

    };
    const updateTable =(pupilList) =>
    {

        // loop through the array
        for (let i = 0; i < pupilList.pupil.length; i++) {
            // create a new row
            if(isStudentExist(pupilList.pupil[i].name)== false) {

                let row = table.insertRow();

                // create a new cell
                let cell = row.insertCell();


                // set the cell as draggable and add the ondragstart event handler
                cell.setAttribute("draggable", "true");
                cell.setAttribute("ondragstart", "drag(event)");
                cell.setAttribute("id", pupilList.pupil[i].id);


                // set the cell content
                cell.innerHTML = pupilList.pupil[i].name;
            }
        }
    }

    $.get(`${URL}/groups/getAllPupilInTheGame`)
        .done((pupilList) =>{
                updateTable(pupilList);
            })
        .catch((err)=>{
            console.log(err.message);}
        )
    socket.on('updatePupilList',(pupilList)=>{
        updateTable(pupilList);
    });



});


// Add drag and drop functions
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    // Find the nearest .group element
    let groupElement = event.target;

    if((groupElement.parentElement).hasAttribute('onDragStart') || groupElement.parentElement.hasAttribute('td'))
    {
        groupElement = groupElement.parentElement;
    }


    // Set the old group id to the current group id if the student is being dragged from a group, or null if they are being dragged from the table
    let div=groupElement.closest('div');


    if(div.className.includes("group")) {
        let oldGroupId = div.id;
        // Set the data to include the student name and group id
        event.dataTransfer.setData("text", groupElement.innerHTML +","+groupElement.id+","+oldGroupId);
    }
    else
    {
        event.dataTransfer.setData("text",event.target.innerHTML+ ","+event.target.id+ ","+",FromTable");
    }



}
function joinGroup()
{
    socket.emit('joinGroupTeacher',event.target.id);
}

function goToPreviousGames()
{
    window.location.replace(`${URL}/previousGames`);
}
const clearRowFromTable =(studentName) =>
{
    const studentTable = document.getElementById("student-table");
    const rows = studentTable.getElementsByTagName("tr");
    for (let i = rows.length - 1; i >= 1; i--) {
        const cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].innerHTML;
            if (cellText === studentName) {
                studentTable.deleteRow(i);
            }
        }
    }
};
function recommendedGroups()
{
    $.get(`${URL}/groups/getRecommendedGroups`)
        .done((groups) =>{
                groups.forEach(function(group) {
                    Object.keys(group).forEach((key) =>{
                        const groupId = "group" + key;
                        const groupElement = document.getElementById(groupId);
                        const studentList = groupElement.getElementsByTagName("ul")[0];
                        studentList.innerHTML = ""; // clear existing students
                        group[key].forEach(function(student) {
                            const studentName = student.split(':')[0];
                            const studentId = student.split(':')[1];
                            studentList.innerHTML += `<li ondragstart='drag(event)' id=${studentId}>` + studentName + "</li>";
                            clearRowFromTable(studentName);
                        });
                    });
                });
        })
        .catch((err)=>{
            console.log(err.message);}
        )
}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    // Split the data into the student name and group id
    let studentData = data.split(",");
    let studentName = studentData[0];
    let studentId = studentData[1];
    let oldGroupId = studentData[2];
    let isDragFromTable = studentData[3];


    // Find the nearest .group element
    let groupElement = event.target;
    while (groupElement && !groupElement.className?.includes("group")) {
        groupElement = groupElement.parentElement;
    }

    // Check if the student is being dragged to the same group they are already in
    if (oldGroupId && oldGroupId === (groupElement ? groupElement.id : null)) {
        return;
    }

    // Remove the student from the old group
    if (oldGroupId) {
        let oldGroupElement = document.getElementById(oldGroupId);
        if (oldGroupElement) {
            let oldStudentElements = oldGroupElement.querySelectorAll("li");
            for (let i = 0; i < oldStudentElements.length; i++) {
                if (oldStudentElements[i].innerHTML === studentName) {
                    oldStudentElements[i].remove();
                    break;
                }
            }
        }
    }
    let studentTable = document.getElementById('student-table');

    // Remove the student from the table
    if(isDragFromTable=="FromTable") {
        const childElements = studentTable.querySelectorAll('tbody > tr > td');
        for (const element of childElements) {
            if(element.innerText==studentName) {
                (element.parentElement).removeChild(element);
                break;
            }
        }


    }


    // Add the student to the new group
    groupElement.querySelector("ul").innerHTML += `<li ondragstart='drag(event)' id=${studentId}>` + studentName + "</li>";

}



// Add function to save groups to JSON object
function saveGroups() {
    // Get the wrapper
    let wrapper = document.getElementById("wrapper");
    // Get the modal element
        let modal = document.getElementById("myModal");
    // Get the yes and no buttons
        const yesBtn = document.getElementById("yesBtn");
    // Get the text element
        const modalText = document.getElementById("modalText");
    let groups = {};
    let isLengthGroupValid=true;
    let groupElements = document.querySelectorAll(".group");
    for (let i = 0; i < groupElements.length; i++) {
        let groupId=groupElements[i].id;
        let id = groupId.substring(groupId.length-1);

        let studentElements = groupElements[i].querySelectorAll("li");
        let students = [];
        for (let j = 0; j < studentElements.length; j++) {
            let student ={};
            student.id=studentElements[j].id;
            student.name=studentElements[j].innerHTML;
            students.push(student);
        }
        if(students.length>=4 && students.length<=6 )
        {
            $(`#${id}`).css('display','block');
        }
        else
        {
            if(students.length>0) {
                isLengthGroupValid = false;
            }
        }
        groups[groupId] = students;
    }
    if(isLengthGroupValid)
    {
        console.log(groups);
        $("input[value='שמור קבוצות']").css('display','none');
        socket.emit('saveGroups',groups);
    }
    else
    {

        modal.style.display = "block";
        wrapper.classList.add("modal-open");
        modalText.innerHTML = "קיימת קבוצה אחת או יותר  שאינן בין 4 ל6 תלמידים";
        yesBtn.onclick = function() {
            modal.style.display = "none";
            wrapper.classList.remove("modal-open");
        }


    }

    // When the user clicks on the yes button
}


