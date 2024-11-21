// gives the first element in the class
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
// ex: select the class of card and give me the first element
const card = document.querySelector(".card");
const apiKey = "41cf1a43e7d25ed16e3e57ed64d24f2b";

weatherForm.addEventListener("submit", async event => {
    // once we have submit the button, forms have a default behavior to
    // refresh the page. Disabling this property
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            // get the weather data
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch{
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    // if the response is not ok
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    } 
    return await response.json();
}
function displayWeatherInfo(data){
    //object destructing
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    // initially clearing the textcontent. resets the error message
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(weatherID){
    switch(true){
        case (weatherID >= 200 & weatherID < 300):
            return "⛈️";
        case (weatherID >= 300 & weatherID < 400):
            return "☔";
        case (weatherID >= 500 & weatherID < 600):
            return "🌧️";
        case (weatherID >= 600 & weatherID < 700):
            return "❄️";
        case (weatherID >= 700 & weatherID < 800):
            return "🌫️";
        case (weatherID === 800):
            return "☀️";
        case (weatherID >= 801 & weatherID < 810):
            return "⛅";
        default:
            return "🌻";
    }

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // if there's anything in the card element
    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}