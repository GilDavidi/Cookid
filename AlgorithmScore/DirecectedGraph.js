// const d3 = require("d3");
//
// // Create the directed graph
// const graph = d3.select("body")
//     .append("svg")
//     .attr("width", 600)
//     .attr("height", 600)
//     .append("g")
//     .attr("transform", "translate(50, 50)");
//
// // Create the nodes
// const pupils = [
//     {name: "Pupil 1"},
//     {name: "Pupil 2"},
//     {name: "Pupil 3"},
//     {name: "Pupil 4"}
// ];
//
// const nodes = graph.selectAll("circle")
//     .data(pupils)
//     .enter()
//     .append("circle")
//     .attr("r", 30)
//     .attr("cx", function (d, i) {
//         return i * 150;
//     })
//     .attr("cy", function (d, i) {
//         return i * 100;
//     });
//
// // Create the edges
// const edges = graph.selectAll("line");
//
// // Function to check if transfer between pupils is successful
// function checkTransfer(source, target) {
//     //assuming you have the transfer data or a way to check if the transfer is successful
//     if (transferSuccess) {
//         edges.data([{ source: source, target: target }])
//             .enter()
//             .append("line")
//             .attr("x1", function(d) { return d.source.x; })
//             .attr("y1", function(d) { return d.source.y; })
//             .attr("x2", function(d) { return d.target.x; })
//             .attr("y2", function(d) { return d.target.y; });
//     } else {
//         console.log("Transfer not successful");
//     }
// }
//
// // Example usage
// checkTransfer(pupils[0], pupils[1]);
//
// // Add labels to the nodes
// const labels = graph.selectAll("text")
//     .data(pupils)
//     .enter()
//     .append("text")
//     .text(function (d) {
//         return d.name;
//     })
//     .attr("x", function (d, i) {
//         return i * 150;
//     })
//     .attr("y", function (d, i) {
//         return i * 100;
//     });
