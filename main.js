const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "f99ec283ed33dce2928492e70cc6cfcf";
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value;

  if (city === "") {
    return; // Empty input, do nothing
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
      } else {
        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        switch (data.weather[0].main) {
          case "Clear":
            image.src = "/Weather-App/images/clear.png";
            break;
          case "Rain":
            image.src = "/Weather-App/images/rain.png";
            break;
          case "Snow":
            image.src = "/Weather-App/images/snow.png";
            break;
          case "Clouds":
            image.src = "/Weather-App/images/cloud.png";
            break;
          case "Mist":
            image.src = "/Weather-App/images/mist.png";
            break;
          default:
            image.src = " "; 
            break;
        }

        temperature.innerHTML = `${parseInt(data.main.temp)},<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
      }
    })     
});
