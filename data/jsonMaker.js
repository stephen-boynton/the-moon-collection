const fs = require("fs");
const diameter = require("./diameters");
const planets = require("./hostPlanets");
const images = require("./moonimages");
const moons = require("./moonNames");
const dates = require("./dates");
const largepics = require("./largepics");
const moonData = require("./moondata2");

let moonList = [];

moonData.forEach((elm, ind, arr) => {
	let sibs = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].planet === elm.planet && elm.name !== arr[i].name) {
			sibs.push(arr[i].name);
		}
		console.log(sibs);
		elm.siblings = sibs;
	}
});

// moons.forEach((elm, ind, arr) => {
// 	moonList[ind] = {
// 		name: elm,
// 		img: largepics[ind],
// 		size: diameter[ind],
// 		planet: planets[ind],
// 		date: dates[ind],
// 		siblings: []
// 	};
// });

let output = JSON.stringify(moonData);

fs.writeFile("moondata2.js", output, "utf8", function() {
	console.log("File has been written");
});
