// // Sorting function to sort pupils by score in ascending order
// function sortByScore(a, b) {
//     return a.score - b.score;
// }
//
//
//
// const recomandedGroups =(pupils) => {
// // Sort the pupils by score in ascending order
//     pupils.sort(sortByScore);
//     console.log(pupils);
//
// // Initialize group lists
//     let group1 = [];
//     let group2 = [];
//     let group3 = [];
//     let group4 = [];
//     let group5 = [];
//     let group6 = [];
//     // Check if there are less than 3 pupils
//     if (pupils.length < 4) {
//         for (let i = 0; i < pupils.length; i++) {
//             const pupil = pupils[i];
//             group1.push(pupil.id);
//         }
//
//     } else {
//         // Assign pupils to groups based on previous connections
//         for (let i = 0; i < pupils.length; i++) {
//             const pupil = pupils[i];
//             let added = false;
//             if (group1.length <= 2) {
//                 for (let j = 0; j < group1.length; j++) {
//                     if (pupil.connections.includes(group1[j].id)) {
//                         group1.push(pupil.id);
//                         added = true;
//                         break;
//                     }
//                 }
//             }
//             if (!added && group2.length <= 2) {
//                 for (let k = 0; k < group2.length; k++) {
//                     if (pupil.connections.includes(group2[k].id)) {
//                         group2.push(pupil.id);
//                         added = true;
//                         break;
//                     }
//                 }
//             }
//             if (!added && group3.length <= 2) {
//                 for (let l = 0; l < group3.length; l++) {
//                     if (pupil.connections.includes(group3[l].id)) {
//                         group3.push(pupil.id);
//                         added = true;
//                         break;
//                     }
//                 }
//             }
//             if (!added && group4.length <= 2) {
//                 for (let m = 0; m < group4.length; m++) {
//                     if (pupil.connections.includes(group4[m].id)) {
//                         group4.push(pupil.id);
//                         added = true;
//                         break;
//                     }
//                 }
//             }
//             if (!added && group5.length <= 2) {
//                 for (let n = 0; n < group5.length; n++) {
//                     if (pupil.connections.includes(group5[n].id)) {
//                         group5.push(pupil.id);
//                         added = true;
//                         break;
//                     }
//                     if (!added && group6.length <= 2) {
//                         for (let o = 0; o < group6.length; o++) {
//                             if (pupil.connections.includes(group6[o].id)) {
//                                 group6.push(pupil.id);
//                                 added = true;
//                                 break;
//                             }
//                         }
//                     }
//                     if (!added) {
//                         if (group1.length < 2) {
//                             group1.push(pupil.id);
//                         } else if (group2.length < 2) {
//                             group2.push(pupil.id);
//                         } else if (group3.length < 2) {
//                             group3.push(pupil.id);
//                         } else if (group4.length < 2) {
//                             group4.push(pupil.id);
//                         } else if (group5.length < 2) {
//                             group5.push(pupil.id);
//                         } else if (group6.length < 2) {
//                             group6.push(pupil.id);
//                         }
//                     }
//                 }
//
//                 console.log("Group 1: " + group1.map(p => p.name).join(", "));
//                 console.log("Group 2: " + group2.map(p => p.name).join(", "));
//                 console.log("Group 3: " + group3.map(p => p.name).join(", "));
//                 console.log("Group 4: " + group4.map(p => p.name).join(", "));
//                 console.log("Group 5: " + group5.map(p => p.name).join(", "));
//                 console.log("Group 6: " + group6.map(p => p.name).join(", "));
//
//             }
//         }
//     }
//     let groups= [];
//
//
//     for (let i=1;i<=6;i++)
//     {
//         if(eval(`group${i}`)) {
//             let group={};
//             group[i]=eval(`group${i}`);
//             groups.push(group);
//         }
//     }
//
//     return groups;
// }


const recomandedGroups = (pupils) => {


    console.log(pupils);


    // Initialize group lists
    let group1 = [];
    let group2 = [];
    let group3 = [];
    let group4 = [];
    let group5 = [];
    let group6 = [];

// Sort pupils by score in ascending order
    pupils.sort((a, b) => a.score - b.score);
    let pupilsPerGroup = 1;
    let index = 4
    while (pupilsPerGroup === 1){
        pupilsPerGroup = Math.floor(pupils.length / index);
        index--;
    }
    if (pupils.length % 2 !== 0) {
        pupilsPerGroup+=1;
    }
    console.log("this is pupilsPerGroup")
    console.log(pupilsPerGroup)

// Iterate over groups
    if (pupils.length < 4) {
        // Iterate over pupils and add them to the first group

        for (let i = 0; i < pupils.length; i++) {
            group1.push(pupils[i].id);
        }
    }
    else if(pupils.length === 7){
        for (let i = 0; i < 4; i++) {
            group1.push(pupils[i].id);
        }
        for (let i = 0; i < 3; i++) {
            group2.push(pupils[i].id);
        }
    }
    else {
        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];
            let added = false;
            if (pupilsPerGroup !== group1.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group1.push(pupil.id);
                        added = true
                    }
                }
            }
            if (pupilsPerGroup !== group2.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group2.push(pupil.id);
                        added = true
                    }
                }
            }
            if (pupilsPerGroup !== group3.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group3.push(pupil.id);
                        added = true
                    }
                }
            }
            if (pupilsPerGroup !== group4.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group4.push(pupil.id);
                        added = true
                    }
                }
            }
            if (pupilsPerGroup !== group5.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group5.push(pupil.id);
                        added = true
                    }
                }
            }
            if (pupilsPerGroup !== group6.length){
                for (let i=0;i<pupilsPerGroup;i++){
                    if (pupil === undefined)
                        break;
                    if (!added) {
                        group6.push(pupil.id);
                        added = true
                    }
                }
            }
        }
    }
    console.log(group1, group2, group3, group4, group5, group6);
    let groups = []
        for (let i=1;i<=6;i++)
    {
        if(eval(`group${i}`)) {
            let group={};
            group[i]=eval(`group${i}`);
            groups.push(group);
        }
    }


    console.log(groups);
    return groups;
}


module.exports.recomandedGroups=recomandedGroups;

