

// Create an empty adjacency list
const graph = new Map();

const setAllStudent =(students) => {
    for(const student of students)
        {
            graph.set(student, []);
        }
}

// Add edges to the graph for successful color transfers
    const addTransfer = (giver, receiver, color) => {
            graph.get(giver).push({student: receiver, color});
            graph.get(receiver).push({student: giver, color});
    };


// Function to count the number of rainbows that pass through a student
const scoreStudent = (student) => {
    let count = 0;

    const dfs = (student, visited = new Set(), currentRainbow = new Set()) => {
        visited.add(student);
        for (const neighbor of graph.get(student)) {
            if (!visited.has(neighbor.student)) {
                currentRainbow.add(neighbor.color);
               // if (currentRainbow.size === colors.length) {
                    count++;
                //} else {
                //    dfs(neighbor.student, visited, currentRainbow);
               // }
                currentRainbow.delete(neighbor.color);
            }
        }
        visited.delete(student);
    };

    dfs(student);
    return count*5;
};




module.exports.setAllStudent =setAllStudent;
module.exports.addTransfer=addTransfer;
module.exports.scoreStudent=scoreStudent;
