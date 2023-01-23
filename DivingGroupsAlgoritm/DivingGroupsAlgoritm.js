// Sorting function to sort pupils by score in ascending order
function sortByScore(a, b) {
    return a.score - b.score;
}



const recomandedGroups =(pupils) => {
    console.log(pupils);
// Sort the pupils by score in ascending order
    pupils.sort(sortByScore);

// Initialize group lists
    let group1 = [];
    let group2 = [];
    let group3 = [];
    let group4 = [];
    let group5 = [];
    let group6 = [];
    // Check if there are less than 3 pupils
    if (pupils.length < 4) {
        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];
            group1.push(pupil.id);
        }

    } else {
        // Assign pupils to groups based on previous connections
        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];
            let added = false;
            if (group1.length >= 2) {
                for (let j = 0; j < group1.length; j++) {
                    if (pupil.connections.includes(group1[j].id)) {
                        group1.push(pupil.id);
                        added = true;
                        break;
                    }
                }
            }
            if (!added && group2.length >= 2) {
                for (let k = 0; k < group2.length; k++) {
                    if (pupil.connections.includes(group2[k].id)) {
                        group2.push(pupil.id);
                        added = true;
                        break;
                    }
                }
            }
            if (!added && group3.length >= 2) {
                for (let l = 0; l < group3.length; l++) {
                    if (pupil.connections.includes(group3[l].id)) {
                        group3.push(pupil.id);
                        added = true;
                        break;
                    }
                }
            }
            if (!added && group4.length >= 2) {
                for (let m = 0; m < group4.length; m++) {
                    if (pupil.connections.includes(group4[m].id)) {
                        group4.push(pupil.id);
                        added = true;
                        break;
                    }
                }
            }
            if (!added && group5.length >= 2) {
                for (let n = 0; n < group5.length; n++) {
                    if (pupil.connections.includes(group5[n].id)) {
                        group5.push(pupil.id);
                        added = true;
                        break;
                    }
                    if (!added && group6.length >= 2) {
                        for (let o = 0; o < group6.length; o++) {
                            if (pupil.connections.includes(group6[o].id)) {
                                group6.push(pupil.id);
                                added = true;
                                break;
                            }
                        }
                    }
                    if (!added) {
                        if (group1.length < 2) {
                            group1.push(pupil.id);
                        } else if (group2.length < 2) {
                            group2.push(pupil.id);
                        } else if (group3.length < 2) {
                            group3.push(pupil.id);
                        } else if (group4.length < 2) {
                            group4.push(pupil.id);
                        } else if (group5.length < 2) {
                            group5.push(pupil.id);
                        } else if (group6.length < 2) {
                            group6.push(pupil.id);
                        }
                    }
                }

                console.log("Group 1: " + group1.map(p => p.name).join(", "));
                console.log("Group 2: " + group2.map(p => p.name).join(", "));
                console.log("Group 3: " + group3.map(p => p.name).join(", "));
                console.log("Group 4: " + group4.map(p => p.name).join(", "));
                console.log("Group 5: " + group5.map(p => p.name).join(", "));
                console.log("Group 6: " + group6.map(p => p.name).join(", "));

            }
        }
    }
    let groups= [];


    for (let i=1;i<=6;i++)
    {
        if(eval(`group${i}`)) {
            let group={};
            group[i]=eval(`group${i}`);
            groups.push(group);
        }
    }
    return groups;
}
module.exports.recomandedGroups=recomandedGroups;
