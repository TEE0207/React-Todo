import React, { useState } from "react"


const mockWeatherData = {
  NewYork: {
    temperature: "22°C",
    humidity: "56%",
    windSpeed: "15 km/h"
  },
  LosAngeles: {
    temperature: "27°C",
    humidity: "45%",
    windSpeed: "10 km/h"
  },
  London: {
    temperature: "15°C",
    humidity: "70%",
    windSpeed: "20 km/h"
  },
  Tokyo: {
    temperature: "19°C",
    humidity: "65%",
    windSpeed: "12 km/h"
  },
  Paris: {
    temperature: "18°C",
    humidity: "62%",
    windSpeed: "8 km/h"
  },
  Sydney: {
    temperature: "24°C",
    humidity: "58%",
    windSpeed: "18 km/h"
  }
};


const WeatherDashboard = () => {


const [searchInput, setSearchInput] = useState(""); //Stores what the user types into the search box.
const [currentWeather, setCurrentWeather] = useState(null); //Stores the selected city's weather data.
const [searchedCities, setSearchedCities] = useState([]); // Keeps a list of previously searched cities.
const [errorMessage, setErrorMessage] = useState(""); //Shows a message if the city is not found.

const handleSearch = () => {
if (!searchInput.trim()) return;


// whatever the searchInput.trim() get it should be save in cityName
const cityName = searchInput.trim().charAt(0).toUpperCase() + searchInput.trim().slice(1).toLowerCase();

//We try to find weather data from the mock database.
const weatherData = mockWeatherData[cityName];

if (weatherData) {

   // if weatherData exist we should bring all what ...weatherData entails and add new object to it which is city as property and the input which is cityName should be the value.
   //...is using the spread operator (...) to combine two things into a new object.
  setCurrentWeather({ city: cityName, ...weatherData });

  //Also, clear any previous error message.
  setErrorMessage('');
  
  // Add cityName input by the user to searchedcities if not already present. so it's only going to add if it's not already in searchedCities
  if (!searchedCities.includes(cityName)) {
    // Bring all the saved ...searchedCities, and the new cityName to it
    setSearchedCities([...searchedCities, cityName]);
  }

  // if the weatherData is not present in mockdata setCurrentWeather to null to ensure that the previous display is not present and it show error message that "city not present"
} else {
  setCurrentWeather(null);
  setErrorMessage('City not found.');
}


// The searchInput field will be set to empty string, when you click on the 
setSearchInput('');


};



// This functions handles the searched cities that is previously searched by the user. It accept the paramemter of cityName which is an argument to it's onClick function

const handleCityClick = (cityName) => {

    // we used it to search the mockWeatherData again and we save the result in weatherData

const weatherData = mockWeatherData[cityName];

if (weatherData) {

    // If weatherData is present add city as property and cityName as value to it's object using ...WeatherData
setCurrentWeather({ city: cityName, ...weatherData });

// Then we setErrorMessage back to empty string
setErrorMessage("");
}


};

//If the user presses Enter in the input box, trigger the handleSearch function.
const handleKeyPress = (e) => {
    // The event Listner which is (e) in the input field has property of key. i.e the e should listen to all the keys on the laptop === "Enter" then fire the handleSearch() function
    console.log(e)
if (e.key === "Enter") {
handleSearch();
}
};

return (
<div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
<h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
Weather Dashboard
</h1>


  {/* Search Section */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex gap-3">
      <input
        type="text"
        id="searchInput"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        // Here is where we use the onKeyPress Function
        onKeyPress={handleKeyPress}
        placeholder="Enter city name..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        id="searchButton"
        // The search button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </div>
  </div>

  {/* Weather Data Display */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div id="weatherData">
        {/* if there's data in currentWeather  */}
      {currentWeather ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Weather in {currentWeather.city}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Temperature:</div>
              <div className="text-2xl font-bold text-blue-600">
                {currentWeather.temperature}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Humidity:</div>
              <div className="text-2xl font-bold text-green-600">
                {currentWeather.humidity}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Wind Speed:</div>
              <div className="text-2xl font-bold text-purple-600">
                {currentWeather.windSpeed}
              </div>
            </div>
          </div>
        </div>
      ) : errorMessage ? (

        // else if there's an error message
        <div className="text-center py-8">
          <div className="text-red-600 text-lg font-semibold">
            {errorMessage}
          </div>
        </div>
      ) : (

        // else display this, if there's no content in currentWeather and there's no errorMessage to display
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">
            Search for a city to see weather data
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Previously Searched Cities */}

  {searchedCities.length > 0 && (

    // if searchedCities is greater than 1 so display this
    <div className="bg-white rounded-lg shadow-md p-6">
      <div id="previousSearches">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Previously Searched Cities
        </h3>
        <div className="flex flex-wrap gap-2">
          {searchedCities.map((city, index) => (
            <button
              key={index}
              // onClick on each city this function should fire
              onClick={() => handleCityClick(city)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* Available Cities Info */}
  <div className="mt-6 bg-blue-50 rounded-lg p-4">
    <h4 className="text-sm font-semibold text-blue-800 mb-2">
      Available Cities (case-sensitive):
    </h4>
    <div className="text-sm text-blue-700">
      {Object.keys(mockWeatherData).join(', ')}
    </div>
  </div>
</div>


);
};

export default WeatherDashboard;