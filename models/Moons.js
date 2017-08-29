const mongoose = require("mongoose");

const MoonSchema = new mongoose.Schema({
	name: { type: String, require: true },
	planet: { type: String, require: true },
	date: { type: String },
	size: { type: Number },
	siblings: { type: Array },
	img: { type: String }
});

// MoonSchema.pre("save", function(next) {
// 	if (Moon.find({ name: this.name })) {
// 		return console.log("This moon already exists");
// 	} else {
// 		next();
// 	}
// });

MoonSchema.pre("save", function(next) {
	let siblings = [];
	Moon.find({ planet: this.planet }).then(moons => {
		moons.forEach((elm, ind, arr) => {
			this.siblings.push(elm.name);
			elm.siblings.push(this.name);
		});
		console.log(this);
		next();
	});
});
// MoonSchema.statics.findSiblings = function (planet, cb) {
// 	return this.find({planet: planet})
// }

// PersonSchema.statics.findByEmail = function (email, cb) {
//   return this.find({ email: email })
// }

const Moon = mongoose.model("Moon", MoonSchema);

module.exports = Moon;
