const mongoose = require("mongoose");
const Moon = require("./models/Moons");
mongoose.Promise = require("bluebird");
// Replace "test" with your database name.
mongoose.connect("mongodb://localhost:27017/moondb");

function getAllMoons() {
	return Moon.find();
}

function getMoon(moonName) {
	return Moon.find({ name: moonName }).catch(function(err) {
		console.log(err);
	});
}

function getPersonByUsername(moonName) {
	return Moon.find({ name: moonName }).catch(function(err) {
		console.log(err);
	});
}

function updateSiblings(planet) {}

updateSiblings("Jupiter");

function addMoon(newMoon) {
	console.log("Saving new moon");
	console.log(newMoon.name);
	const moon = new Moon({
		name: newMoon.name,
		planet: newMoon.planet,
		date: newMoon.date,
		size: Number(newMoon.size),
		siblings: [],
		img: newMoon.img
	});
	console.log(moon);
	moon.save(function(err) {
		console.log(err);
	});
	return Promise.resolve("success");
}

function deleteMoon(moonId) {
	return Moon.deleteOne({ _id: moonId });
}

module.exports = {
	getAllMoons,
	getMoon,
	addMoon,
	deleteMoon
};
