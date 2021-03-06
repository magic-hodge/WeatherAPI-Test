/* Global Variables */

let allData = {};

//let appDataArray = new Array();

// Code for apiKey and baseURL.

const apiKey = "&appid=2007188b5284d5745bf8b385a92fd005&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let zip = document.getElementById("zip");
let userInput = document.getElementById("feelings");

// totalURL is not working in my getWeatherData function for some reason. . . Fix later.
// Worked around by using the template literals to make full URL in "fetch" field.
let totalURL = `${baseURL}+${zip.value}+${apiKey}`;

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async function to post data.
// This is a pain to figure out, and I'm not even completely sure I've sorted this. Please help. Thanks!

const postWeatherData = async (url = "", data = {}) => {
	console.log(data);
		const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
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
	const request = await fetch(`${baseURL}${zip.value}${apiKey}`);
	try {
		const allData = await request.json();
		return allData;

		//appDataArray.unshift(allData);

		// Feel free to comment this back in if you want to see taht it's stored properly.
		// console.log(appDataArray);
		//console.log(allData);
		//console.log(allData.main.temp);
		//console.log(allData.name);

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

	const retrieveData = async () => {
		const request = await fetch('/all');
		console.log('UpdateUI request', request);
		try{
			const allData = await request.json()
			console.lgo(allData)
			document.getElementById('temp').innerHTML = `Temp: ${Math.round(allData.temperature)} F`;
			document.getElementById('date').innerHTML = allData.date;
			document.getElementById('content').innerHTML = `Feelings: ${allData.userContent}`;
		}
		catch(error) {
			console.log("error", error);
		}
	}


}


// Unused for Update UI function...

			// giving data to variables.
		// I'll have to move some of this somewhere else because it's not all supposed to be here.
		
	//let dateField = document.getElementById("date");
	//let zipCode = document.getElementById("zipCode");
	//let temp = document.getElementById("temp");
	//let content = document.getElementById("content");

	//zipCode.innerHTML = `Zip: ${appDataArray[0]["Zip"]}`;
	//temp.innerHTML = `Temp: ${appDataArray[0]["Temperature"]} F`;
	//content.innerHTML = `Feelings: ${appDataArray[0]["Feelings"]}`;
	//dateField.innerHTML = `Date: ${appDataArray[0]["Date"]}`;



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

document.getElementById("generate").addEventListener("click", testGetPost);

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
	
	getWeatherData(`${baseURL}${zip.value}${apiKey}`)
	.then(function(data){
		console.log(data);
		postWeatherData('/add', {
			temperature : data.main.temp,
			date : newDate,
			userContent : userInput.value, 
		})
	})
	.then(function (){
		updateUI();
	})
		//console.log(allData.temperature);
		//console.log(appData.date);


}