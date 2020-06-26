// server.js file to set up node and express environment & capture all project data.

// Code for projectData.

projectData = {};

// Code to set up & run Express for server and API routes.

const express = require("express");
const app = express();

// Code for app to use body-parser and convert to JSON data.

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Code for setting up and utilizing cors.

const cors = require('cors');
app.use(cors());

// Code to utilize website as the main folder.

app.use(express.static("website"));

// Code to set up the server environment.

const port = 8000;

const server = app.listen(port, ()=> {
	console.log(`running on localhost ${port}`)
});

// Initialize all route with a callback function

app.get("/all", function (req, res) {
	res.send(projectData);
});

// Callback function to complete GET '/all'

// Post Route
// messed with this last. . . added newEntry and lines above PD.push(reqbody). Also changed from /add to /addWeatherData.
app.post("/add", function (req, res) {
	console.log(req.body)
	projectData = {
		temperature: req.body.temperature,
		date: req.body.date,
		content: req.body.userInput,
	}
	projectData = newEntry;
	res.send(projectData);
	console.log(projectData);
});

// Post weather data.

const data = [];

app.post("/addWeatherData", addWeatherData);

//Still need to test this code.

function addWeatherData (req, res) {
	//const body = req.body;
	data.push(req.body);
	projectData = {req.body, ...projectData};
	projectData.append(req.body);
}

// hopefully doing this right...
// // function to make new data.

function makeData(request){
	let newData = request.body;
	const newEntry = {
		date: newData.date,
		temperature: newData.temperature,
		userContent: newData.userContent,
	}
	data.push(newEntry);
	projectData = {newEntry, ...projectData};
}