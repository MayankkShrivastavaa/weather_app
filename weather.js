let searchBtn = document.querySelector("#search");
let resultBox = document.querySelector("#result");


let apiKey = "4cf65cc5e777ee0931881298f29279d8";

searchBtn.addEventListener("click", async () => {
    let cityName = document.getElementById("city-name").value.trim();
    console.log(cityName);

    if (cityName === "") {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = `<h3 class ="text-red-800 font-semibold text-center text-lg">Please Enter a City Name</h3>`;
        return;
    }

    try {
        resultBox.classList.remove("hidden");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

        console.log(response);

        let data = await response.json();
        console.log(data);

        if (data.cod != 200) {
            resultBox.innerHTML = `
            <h3 class = "text-red-800 font-semibold text-center text-lg">${data.message}</h3>
            `;
            return;
        }

        let icon = data.weather[0].icon;

        resultBox.innerHTML =
            `<div class = "text-center">
            <h2 class = "text-3xl font-bold text-gray-800">${data.name}, ${data.sys.country}</h2>
            <p class = "text-gray-600 mt-1">${data.weather[0].description}</p>
            <img src = "https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon" class = "mx-auto"/>
            <h1 class = "text-5xl font-bold text-blue-700">${data.main.temp}°C</h1>

            <div class = "grid grid-cols-2 gap-4 mt-6 "> 
                <div class = "bg-white/60 p-4 rounded-xl shadow">
                <p class = "text-gray-600 text-sm font-bold">Humidity</p>
                <h3 class = "text-2xl font-bold text-gray-800 "> ${data.main.humidity}%</h3>
                </div>
                 <div class = "bg-white/60 p-4 rounded-xl shadow">
                <p class = "text-gray-600 text-sm font-bold">Feels Like</p>
                <h3 class = "text-2xl font-bold text-gray-800 "> ${data.main.feels_like}°C</h3>
                </div>
            </div>




        </div>`;



    } catch (error) {
        console.log(error);
    }




})