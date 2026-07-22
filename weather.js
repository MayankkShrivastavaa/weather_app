let searchBtn = document.querySelector("#search");
let resultBox = document.querySelector("#result");

let apiKey = "4cf65cc5e777ee0931881298f29279d8";

searchBtn.addEventListener("click", async () => {
    let cityName = document.getElementById("city-name").value.trim();

    if (cityName === "") {
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-amber-400/20 bg-[#16181c] px-6 py-8 text-center">
                <div class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10 text-xl text-amber-300">!</div>
                <h3 class="text-lg font-semibold text-white">Please enter a city name</h3>
                <p class="text-sm text-zinc-400">Type the city you want to explore and try again.</p>
            </div>
        `;
        return;
    }

    try {
        resultBox.classList.remove("hidden");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        let data = await response.json();

        if (data.cod != 200) {
            resultBox.innerHTML = `
                <div class="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-zinc-800 bg-[#16181c] px-6 py-8 text-center">
                    <h3 class="text-lg font-semibold text-white">${data.message}</h3>
                    <p class="text-sm text-zinc-400">Please verify the city name and try again.</p>
                </div>
            `;
            return;
        }

        let icon = data.weather[0].icon;
        let description = data.weather[0].description;

        resultBox.innerHTML = `
            <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                    <div>
                        <p class="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">Current conditions</p>
                        <h2 class="mt-2 text-3xl font-semibold text-white">${data.name}, ${data.sys.country}</h2>
                        <p class="mt-2 text-base capitalize text-zinc-400">${description}</p>
                    </div>
                    <div class="flex items-center gap-3 rounded-full border border-zinc-800 bg-[#101215] px-4 py-2 text-sm text-zinc-400">
                        <span class="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                        Updated now
                    </div>
                </div>

                <div class="rounded-[24px] border border-zinc-800 bg-[#111315] p-6 sm:p-8">
                    <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                        <div class="flex flex-col items-center sm:items-start">
                            <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="h-16 w-16" />
                            </div>
                            <h1 class="text-5xl font-semibold text-white sm:text-6xl">${data.main.temp}°C</h1>
                        </div>

                        <div class="flex flex-col items-center text-center sm:items-start sm:text-left">
                            <p class="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">Feels like</p>
                            <p class="mt-2 text-2xl font-semibold text-zinc-200">${data.main.feels_like}°C</p>
                        </div>
                    </div>

                    <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                        <div class="rounded-[20px] border border-zinc-800 bg-[#0c0e11] p-4">
                            <p class="text-sm font-medium text-zinc-500">Humidity</p>
                            <p class="mt-2 text-2xl font-semibold text-white">${data.main.humidity}%</p>
                        </div>
                        <div class="rounded-[20px] border border-zinc-800 bg-[#0c0e11] p-4">
                            <p class="text-sm font-medium text-zinc-500">Wind Speed</p>
                            <p class="mt-2 text-2xl font-semibold text-white">${data.wind.speed} m/s</p>
                        </div>
                        <div class="rounded-[20px] border border-zinc-800 bg-[#0c0e11] p-4">
                            <p class="text-sm font-medium text-zinc-500">Pressure</p>
                            <p class="mt-2 text-2xl font-semibold text-white">${data.main.pressure} hPa</p>
                        </div>
                        <div class="rounded-[20px] border border-zinc-800 bg-[#0c0e11] p-4">
                            <p class="text-sm font-medium text-zinc-500">Feels Like</p>
                            <p class="mt-2 text-2xl font-semibold text-white">${data.main.feels_like}°C</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.log(error);
        resultBox.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-zinc-800 bg-[#16181c] px-6 py-8 text-center">
                <h3 class="text-lg font-semibold text-white">Something went wrong</h3>
                <p class="text-sm text-zinc-400">Please try again in a moment.</p>
            </div>
        `;
    }
});