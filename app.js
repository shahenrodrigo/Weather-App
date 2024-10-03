const userLocation = document.getElementById("userLocation"),
    converter = document.getElementById("converter"),
    weatherIcon = document.querySelector(".weatherIcon"),
    temperature = document.querySelector(".temperature"),
    feelsLike = document.querySelector(".feelslike"),
    description = document.querySelector(".description"),
    date = document.querySelector(".date"),
    city = document.querySelector(".city"),

    HValue = document.getElementById("HValue"),
    WValue = document.getElementById("WValue"),
    SRValue = document.getElementById("SRValue"),
    SSValue = document.getElementById("SSValue"),
    CValue = document.getElementById("CValue"),
    UVValue = document.getElementById("UVValue"),
    PValue = document.getElementById("PValue"),

    Forecast = document.querySelector(".Forecast");

WeatherAPI = `https://api.openweathermap.org/data/2.5/weather?appid=e286d9ec26b378b1be2b514b5faac2dd&q=`;

function findUserLocation() {

    fetch(WeatherAPI + userLocation.value)
        .then((response) => response.json())
        .then(data => {
            if (data.cod != '' && data.cod != 200) {
                alert(data.message);
                return;
            }

            weatherIcon.style.background = `url( https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=e286d9ec26b378b1be2b514b5faac2dd&units=metric`)
                .then((response) => response.json())
                .then(data => {
                    console.log(data);

                    temperature.innerHTML = tempConverter(data.main.temp);
                    feelsLike.innerHTML = "Feels like " + data.main.feels_like;
                    description.innerHTML =
                        `<i class = "fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;

                    const options2 = {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    };

                    date.innerHTML = getLongFormateDateTime(data.dt, data.timezone, options2);
                    city.innerHTML = data.name + "," + data.sys.country;

                    HValue.innerHTML = Math.round(data.main.humidity) + "<span>%</span>"
                    WValue.innerHTML = Math.round(data.wind.speed) + "<span>m/s</span>"

                    const options1 = {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    };

                    SRValue.innerHTML = getLongFormateDateTime(data.sys.sunrise, data.timezone, options1);
                    SSValue.innerHTML = getLongFormateDateTime(data.sys.sunset, data.timezone, options1);

                    CValue.innerHTML = data.clouds.all + "<span>%</span>"
                    UVValue.innerHTML = ((data.visibility) / 1000) + "<span>km</span>";
                    PValue.innerHTML = data.main.pressure + "<span>hPa</span>"

                });

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=e286d9ec26b378b1be2b514b5faac2dd&units=metric`)
                .then((response) => response.json())
                .then(data => {
                    console.log(data.list);
                    Forecast.innerHTML = "";

                    data.list.forEach(element => {
                        let div = document.createElement("div");

                        const options = {
                            weekday: "long",
                            month: "long",
                            day: "numeric"
                        };

                        div.innerHTML += getLongFormateDateTime(element.dt, 0, options);
                        div.innerHTML += `<p class="img"><img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"/></p>`
                        div.innerHTML += `<p class="forecast-desc">${element.weather[0].description}</p>`
                        div.innerHTML += `<span><span>${tempConverter(element.main.temp)}</span></span>`
                        Forecast.append(div);

                    });

                });
        });

}

function formatUnixTime(dtValue, offSet, options = {}) {
    const date = new Date((dtValue + offSet) * 1000);
    return date.toLocaleTimeString([], { timeZone: "UTC", ...options });

}

function getLongFormateDateTime(dtValue, offSet, options) {
    return formatUnixTime(dtValue, offSet, options)
}

function tempConverter(temp) {
    let tempValue = temp;
    let message = "";

    if (converter.value == "°C") {
        message = tempValue + "<span>°C</span>";

    } else {
        let tempF = Math.round((tempValue * 9) / 5 + 32);
        message = tempF + "<span>°F</span>";
    }

    return message;
}

