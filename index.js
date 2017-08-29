const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mustacheExpress = require("mustache-express");
const fs = require("fs");
const { getMoon, getAllMoons, addMoon } = require("./dal");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
	session({
		secret: "hamsandwich",
		saveUninitialized: false,
		resave: false
	})
);

function moonExists(req, res, next) {
	if (getMoon({ name: this.name })) {
		return console.log("This moon already exists");
	} else {
		next();
	}
}

app.get("/", (req, res) => {
	getAllMoons().then(moons => {
		res.render("index", { moons });
	});
});

app.get("/newmoon", (req, res) => {
	res.render("new");
});

app.post("/newmoon/new", (req, res) => {
	addMoon(req.body).then(() => {
		res.redirect("/newmoon");
	});
});

app.get("/moon/:name", (req, res) => {
	getMoon(req.params.name).then(thisMoon => {
		res.render("moon", { thisMoon });
	});
});

//your routes

app.set("port", 3000);

app.listen(app.get("port"), () => {
	console.log("Your app has started, sir.");
});
