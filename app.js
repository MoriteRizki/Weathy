window.addEventListener("load", () => {
  document.querySelector(".location-input").value = "";
  getWeatherData();
});

// retrieving the city name from the input when the user click on search
document.querySelector(".search").addEventListener("click", () => {
  let city = document.querySelector(".location-input").value;
  if (city) {
    let errorDesc = document.querySelector(".error-h3");
    errorDesc.textContent = "";
    getWeatherByCity(city);
  } else {
    let errorDesc = document.querySelector(".error-h3");
    errorDesc.textContent = "please enter a city name !";
  }
});

// function role >> set the skycon icon
function weatherIcon(icon) {
  const skycons = new Skycons({ color: "#122140" });
  skycons.add(document.getElementById("icon2"), Skycons[icon]);
  skycons.play();
}
getPopularLocationsWeather();
// function role >> fetching the api and pull out the data that we need as JSON
function getWeatherData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      getNext7DaysWeather(long, lat);

      let api = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;
      console.log(long, lat);
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWeatherInfoForCurrentLocation(data);
          let icon = iconDescription(data.weather[0].description);
          weatherIcon(icon);
        });
    });
  } else {
    alert("please refrech and allow geolocation to use this app !");
  }
}

/* 
  function role >> 
  getting the current weather data from the api 
  set the Dom elemnts with the data from the api
  */
function setWeatherInfoForCurrentLocation(data) {
  let temperatureDegree = document.querySelector(".temperature-degree");
  let currentCity = document.querySelector(".currentCity");
  let currentDate = document.querySelector(".currentDate");
  let celsius = Math.floor(data.main.temp - 273.15);
  let descriptionData = document.querySelector(".description-data");
  let minTemp = document.querySelector(".min-temp-data");
  let maxTemp = document.querySelector(".max-temp-data");
  let windSpeed = document.querySelector(".wind-speed-data");
  ///////////////////////////////////////////////////////
  temperatureDegree.textContent = celsius + "°";
  currentCity.textContent = data.name;
  currentDate.textContent = getCurrentDate();
  descriptionData.textContent = data.weather[0].description;
  minTemp.textContent = Math.floor(data.main.temp_min - 273.15) + "°";
  maxTemp.textContent = Math.floor(data.main.temp_max - 273.15) + "°";
  windSpeed.textContent = data.wind.speed + " m/s";
}

// function role >> getting the current Date and convert it to a string
function getCurrentDate() {
  let weekDay = new Date().getDay();
  let dayNumber = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let dayName = "";
  let monthName = "";
  let fullDateString = "";

  replaceNext7daysName(dayNumber, month);

  switch (weekDay) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
  }

  switch (month) {
    case 0:
      monthName = "Jan";
      break;
    case 1:
      monthName = "Feb";
      break;
    case 2:
      monthName = "Mar";
      break;
    case 3:
      monthName = "Apr";
      break;
    case 4:
      monthName = "May";
      break;
    case 5:
      monthName = "Jun";
      break;
    case 6:
      monthName = "Jul";
      break;
    case 7:
      monthName = "Aug";
      break;
    case 8:
      monthName = "Sept";
      break;
    case 9:
      monthName = "Oct";
      break;
    case 10:
      monthName = "Nov";
      break;
    case 11:
      monthName = "Dec";
      break;
  }

  fullDateString = dayName + ", " + dayNumber + " " + monthName + " " + year;

  return fullDateString;
}

// function role >> fetching the api to extract the weather data for the next 7 days
function getNext7DaysWeather(long, lat) {
  let Next7days = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;
  fetch(Next7days)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      replaceNext7DayswithApiData(data);
    });
}

/*
  function role >> replace the text content of the next 7 days 
  for example : if today is 22/5
  it will replace the elemnts text's with the next 7 days 
  day 1 = 23/5, day 2 = 24/5, day 3 = 24/5, .... 
  */
function replaceNext7daysName(currentDay, currentMonth) {
  let day1 = document.querySelector(".day1");
  let day2 = document.querySelector(".day2");
  let day3 = document.querySelector(".day3");
  let day4 = document.querySelector(".day4");
  let day5 = document.querySelector(".day5");
  let day6 = document.querySelector(".day6");
  let day7 = document.querySelector(".day7");

  day1.textContent = currentDay + 1 + "/" + currentMonth + 1;
  day2.textContent = currentDay + 2 + "/" + currentMonth + 1;
  day3.textContent = currentDay + 3 + "/" + currentMonth + 1;
  day4.textContent = currentDay + 4 + "/" + currentMonth + 1;
  day5.textContent = currentDay + 5 + "/" + currentMonth + 1;
  day6.textContent = currentDay + 6 + "/" + currentMonth + 1;
  day7.textContent = currentDay + 7 + "/" + currentMonth + 1;
}

// function role >> replace the Next 7 days text Content with the data from the API
function replaceNext7DayswithApiData(data) {
  let day1 = document.querySelector(".Mon-day-temp");
  let day2 = document.querySelector(".Tue-day-temp");
  let day3 = document.querySelector(".Wed-day-temp");
  let day4 = document.querySelector(".Thy-day-temp");
  let day5 = document.querySelector(".Fri-day-temp");
  let day6 = document.querySelector(".Sab-day-temp");
  let day7 = document.querySelector(".Sun-day-temp");

  day1.textContent = Math.floor(data.daily[1].temp.day - 273.15) + "°";
  day2.textContent = Math.floor(data.daily[2].temp.day - 273.15) + "°";
  day3.textContent = Math.floor(data.daily[3].temp.day - 273.15) + "°";
  day4.textContent = Math.floor(data.daily[4].temp.day - 273.15) + "°";
  day5.textContent = Math.floor(data.daily[5].temp.day - 273.15) + "°";
  day6.textContent = Math.floor(data.daily[6].temp.day - 273.15) + "°";
  day7.textContent = Math.floor(data.daily[7].temp.day - 273.15) + "°";
}

// function role >> fetching the weather APIs for the 3 popular cities and set the DOM element with it
function getPopularLocationsWeather() {
  let london = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=london&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;
  let washington = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=washington&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;
  let tokyo = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;

  fetch(london)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let london_temp = document.querySelector(".london-temp");
      london_temp.textContent = Math.floor(data.main.temp - 273.15) + "°";
    });

  fetch(washington)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let washington_temp = document.querySelector(".washington-temp");
      washington_temp.textContent = Math.floor(data.main.temp - 273.15) + "°";
    });

  fetch(tokyo)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let tokyo_temp = document.querySelector(".tokyo-temp");
      tokyo_temp.textContent = Math.floor(data.main.temp - 273.15) + "°";
    });
}

function getWeatherByCity(city) {
  let apiByCity = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5b0ddaf87fa6e6e48823ce737defbc8`;

  fetch(apiByCity)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let errorDesc = document.querySelector(".error-h3");
      errorDesc.textContent = "";
      setWeatherInfoForCurrentLocation(data);
      getNext7DaysWeather(data.coord.lon, data.coord.lat);
      let icon = iconDescription(data.weather[0].description);
      weatherIcon(icon);
    })
    .catch((error) => {
      let errorDesc = document.querySelector(".error-h3");
      errorDesc.textContent =
        "invalide city name ! please check the city name.";
    });
}

// 9 - geting the weather description and make it fit the Skycon icons name format
function iconDescription(icon) {
  let weathericon;
  switch (icon) {
    case "broken clouds":
      weathericon = "CLOUDY";
      break;
    case " heavy intensity rain":
      weathericon = "SLEET";
      break;
    case "light rain":
      weathericon = "RAIN";
      break;
    case "sky is clear":
      weathericon = "CLEAR_DAY";
      break;
    case "clear sky":
      weathericon = "CLEAR_DAY";
      break;
    case "few clouds":
      weathericon = "PARTLY_CLOUDY_DAY";
      break;
    case "scattered clouds":
      weathericon = "PARTLY_CLOUDY_DAY";
      break;
    case "overcast clouds":
      weathericon = "CLOUDY";
      break;
    default:
      weathericon = "PARTLY_CLOUDY_DAY";
  }
  return weathericon;
}

// changing the DOM elements color dark/light mode
document.querySelector(".dark-mode-btn").addEventListener("click", () => {
  let btn = document.querySelector(".dark-mode-btn p");
  if (btn.textContent === "Dark mode is on") {
    btn.textContent = "Dark mode is off";
    document.querySelector(".weather-section").style.backgroundColor =
      "#F2D377";
    document.querySelector(".search-section").style.backgroundColor = "#F2B366";
    document.querySelector(".navbar, body").style.color = "black";
    document.querySelector(".location-input").style.color = "black";
    document.querySelector(".dark-mode-btn").style.backgroundColor = "#F2D377";
    btn.style.color = "black";
  } else {
    btn.textContent = "Dark mode is on";
    document.querySelector(".weather-section").style.backgroundColor =
      "#122140";
    document.querySelector(".search-section").style.backgroundColor = "#1c2b59";
    document.querySelector(".navbar, body").style.color = "white";
    document.querySelector(".location-input").style.color = "white";
    document.querySelector(".dark-mode-btn").style.backgroundColor = "#122140";
    btn.style.color = "white";
  }
});
