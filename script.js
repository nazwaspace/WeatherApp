const apiKey = "604c7037828bbe014acce6a747f1259a"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorContainer.style.display = "block";
            weatherContainer.style.display = "none";
        } else {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".description").innerHTML = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            changeBackground(data.weather[0].main);

            weatherContainer.style.display = "flex";
            errorContainer.style.display = "none";
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal mengambil data cuaca. Periksa koneksi internet atau API Key.");
    }
}

function changeBackground(condition) {
    const body = document.body;
    let bgStyle = "";

    switch (condition) {
        case "Clouds":
            bgStyle = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;
        case "Clear":
            bgStyle = "linear-gradient(135deg, #2980b9, #6dd5fa, #ffffff)";
            break;
        case "Rain":
        case "Drizzle":
            bgStyle = "linear-gradient(135deg, #4b6cb7, #182848)";
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            bgStyle = "linear-gradient(135deg, #3E5151, #DECBA4)";
            break;
        case "Thunderstorm":
            bgStyle = "linear-gradient(135deg, #23074d, #cc5333)";
            break;
        case "Snow":
            bgStyle = "linear-gradient(135deg, #83a4d4, #b6fbff)";
            break;
        default:
            bgStyle = "linear-gradient(135deg, #1c92d2, #f2fcfe)";
            break;
    }
    
    body.style.background = bgStyle;
}

searchBtn.addEventListener("click", () => {
    if(searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});
