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

function getMoonID(moonName) {
	return new Promise((resolve, reject, err) => {
		getMoon(moonName).then(thisMoon => {
			const [moonObj] = thisMoon;
			console.log(moonObj._id);
			resolve(moonObj._id);
		});
	});
}

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

function updateMoon(moon) {
	console.log(moon);
	Moon.update(
		{ _id: moon.id },
		{
			$set: {
				name: moon.name,
				planet: moon.planet,
				date: moon.date,
				size: Number(moon.size),
				img: moon.img
			}
		},
		function(err, raw) {
			if (err) return handleError(err);
			console.log("The raw response from Mongo was ", raw);
		}
	);
}

function deleteMoon(moonId) {
	console.log("Deleting moon: " + moonId);
	return Moon.deleteOne({ _id: moonId }, err => {
		console.log(err);
	});
}

module.exports = {
	getAllMoons,
	getMoon,
	getMoonID,
	addMoon,
	deleteMoon,
	updateMoon
};
