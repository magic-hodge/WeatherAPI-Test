/* Global Variables */

const appData = {};
// Code for apiKey and baseURL.

let apiKey = "&appid=2007188b5284d5745bf8b385a92fd005";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let city = document.getElementById("city");
let userInput = document.getElementById("feelings");

// totalURL is not working in my getWeatherData function for some reason. . . Fix later.
// Worked around by using the template literals to make full URL in "fetch" field.
let totalURL = `${baseURL}+${city.value}+${apiKey}`;

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async function to post data.

const postWeatherData = async (url = "", data = {}) => {
	console.log(data)
		const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

		try {
			const newData = await response.json();
			console.log(newData);
			return newData;
		} catch(error) {
			console.log("error", error);
		}
}

// Async function to get data.

const getWeatherData = async (url = "") => {
	const request = await fetch(`${baseURL}+${city.value}+${apiKey}`);
	try {
		const allData = await request.json();
		console.log(allData);

		// giving data to variables.
		
		let date = newDate;
		let cityValue = allData["name"];
		let tempValue = allData["main"]["temp"];
		let contentText = userInput.value;

		cityName.innerHTML = cityValue;
		temp.innerHTML = tempValue;
		content.innerHTML = contentText;

	} catch(error) {
		console.log("error", error);
	}
};

// Function to post weather data, then get the weather data.

function postGet() {
	postData("/weatherData", {})
		.then(function(data){
			retrieveData("/all")
		})
}

// Function to test url and getting data.

//function testCity() {
//	let totalURL = baseURL+city.value+apiKey;
//	console.log(totalURL);
//}

document.getElementById("submit").addEventListener("click", getWeatherData);

