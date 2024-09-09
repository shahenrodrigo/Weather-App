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

function findUserLocation() {
    const apiKey = '28e3387a82af4064989202843240809';
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userLocation.value}&days=8`)
        .then((response) => response.json())
        .then(data => {

            console.log(data);

            // Forecast.innerHTML="";

            city.innerHTML = data.location.name + ", " + data.location.country;
            weatherIcon.style.background = `url(http://cdn.weatherapi.com/weather/64x64/day/116.png)`

            temperature.innerHTML = data.current.temp_c;
            feelsLike.innerHTML = "Feels like " + data.current.feelslike_c;
            description.innerHTML =
                `<i class = "fa-brands fa-cloudversify"></i> &nbsp;` + data.current.condition.text;

            date.innerHTML = data.location.localtime;




            HValue.innerHTML = Math.round(data.current.humidity) + "<span>%</span>";
            WValue.innerHTML = Math.round(data.current.wind_kph) + "<span> kph</span>";


            SRValue.innerHTML = data.forecast.forecastday[0].astro.sunrise;
            SSValue.innerHTML = data.forecast.forecastday[0].astro.sunset;

            CValue.innerHTML = data.current.cloud + "<span>%</span>";
            UVValue.innerHTML = data.current.uv;
            PValue.innerHTML = data.current.pressure_mb + "<span>hPa</span>";


            data.forecast.forecastday.forEach((weather) => {

                let div = document.createElement("div");
                div.innerHTML += "oo";
                Forecast.append(div);

            });


        });

}

