/* Global Variables */

const appDataArray = new Array();

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
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async function to post data.
// This is a pain to figure out, and I'm not even completely sure I've sorted this. Please help. Thanks!

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
		appDataArray.unshift( {"Date" : newDate, "City" : allData["name"], "Temperature" : (((allData["main"]["temp"])-273.15) * 9/5 + 32).toFixed(0), "Mood" : userInput.value });
		// Feel free to comment this back in if you want to see taht it's stored properly.
		//console.log(appDataArray);

	} catch(error) {
		console.log("error", error);
	}
};

// Function to post weather data, then get the weather data.

// function postGet() {
//	postData("/weatherData", {})
//		.then(function(data){
//			retrieveData("/all")
//		})
//}

// Function to update UI with data.

function updateUI() {

		// giving data to variables.
		// I'll have to move some of this somewhere else because it's not all supposed to be here.
		
		let dateField = document.getElementById("date");
		let cityName = document.getElementById("cityName");
		let temp = document.getElementById("temp");
		let content = document.getElementById("content");

		cityName.innerHTML = `City: ${appDataArray[0]["City"]}`;
		temp.innerHTML = `Temp: ${appDataArray[0]["Temperature"]} F`;
		content.innerHTML = `Mood: ${appDataArray[0]["Mood"]}`;
		dateField.innerHTML = `Date: ${appDataArray[0]["Date"]}`;

}

// Function to show time.
// This funcion does not update by the second. I'm trying to sort out why my setInterval is not working. . .
//  Please help if possible!

function displayTime() {
	
	let time = document.getElementById("time");
	let hours = d.getHours();
	let minutes = d.getMinutes();
	let seconds = d.getSeconds();

	time.innerHTML = `${d.getHours()}:${addZeros(d.getMinutes())}:${addZeros(d.getSeconds())}`;

	setInterval(displayTime, 3000);

}

function addZeros(n) {
	return (parseInt(n, 10) < 10 ? "0" : "") + n;
}


//setInterval(() => console.log("test"), 1000);
//setInterval(() => console.log(time.innerHTML), 1000);
//setInterval(() => console.log(d.getSeconds()), 1000);

setInterval(displayTime(), 3000);

// Function to test url and getting data.

//function testCity() {
//	let totalURL = baseURL+city.value+apiKey;
//	console.log(totalURL);
//}

document.getElementById("submit").addEventListener("click", testGetPost);

//function getPost() {
//	getWeatherData();
//	updateUI();
//}

//function test() {

//	getWeatherData(`${baseURL}+${city.value}+${apiKey}`)
//		.then(function(data){
//			console.log(data);
//			postWeatherData('/addWeatherData', {temperature:allData.main.temp, date:newDate, userContent:content,}) })
//				.then(function(){
//					updateUI();
//	 			});
// }

function testGetPost() {
	
	getWeatherData(`${baseURL}+${city.value}+${apiKey}`)
	.then(function(data){
		updateUI();
	})
		//console.log(allData.temperature);
		//console.log(appData.date);


}