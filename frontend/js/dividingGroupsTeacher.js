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
        event.dataTransfer.setData("text", groupElement.innerHTML + "," + oldGroupId);
    }
    else
    {
        event.dataTransfer.setData("text",event.target.innerHTML+ ","+ ",FromTable");
    }



}


function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    // Split the data into the student name and group id
    let studentData = data.split(",");
    let studentName = studentData[0];
    let oldGroupId = studentData[1];
    let isDragFromTable = studentData[2];


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

    // Remove the student from the table
    if(isDragFromTable=="FromTable") {

        let table = document.getElementById('student-table');
        const childElements = table.querySelectorAll('tbody > tr > td');
        for (const element of childElements) {

            if(element.innerText==studentName) {
                (element.parentElement).removeChild(element);
                break;
            }
        }


    }


    // Add the student to the new group
    groupElement.querySelector("ul").innerHTML += "<li ondragstart='drag(event)'>" + studentName + "</li>";

}








// Add function to save groups to JSON object
function saveGroups() {
    let groups = {};
    let groupElements = document.querySelectorAll(".group");
    for (let i = 0; i < groupElements.length; i++) {
        let groupName = groupElements[i].querySelector("h3").innerHTML;
        let studentElements = groupElements[i].querySelectorAll("li");
        let students = [];
        for (let j = 0; j < studentElements.length; j++) {
            students.push(studentElements[j].innerHTML);
        }
        groups[groupName] = students;
    }
    console.log(groups);
}
