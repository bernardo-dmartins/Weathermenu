const apiKey = ''; // Adicionar sua chave API

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const getWeatherData = async (city) => {
    const apiWeatherURL = `` // Adicionar a URl do site da sua API


    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
};


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

// Função para adicionar a animação de chuva ao fundo
function addRainAnimation() {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain');

    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = `${Math.random() * 100}%`;
        raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        rainContainer.appendChild(raindrop);
    }

    document.body.appendChild(rainContainer);
}

// Função para remover a animação de chuva do fundo
function removeRainAnimation() {
    const rainContainer = document.querySelector('.rain');
    if (rainContainer) {
        document.body.removeChild(rainContainer);
    }
}

// Evento para tratar a resposta da API de clima e exibir a animação de chuva conforme necessário
window.addEventListener('load', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search');

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value;
        const weatherData = await getWeatherData(city);

        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            const weatherCondition = weatherData.weather[0].main.toLowerCase();

            if (weatherCondition === 'rain' || weatherCondition === 'drizzle') {
                addRainAnimation();
            } else {
                removeRainAnimation();
            }
        } else {
            removeRainAnimation();
        }
    });
});


