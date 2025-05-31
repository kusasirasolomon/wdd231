const weatherContainer = document.getElementById('weather');

const apiKey = "7f5c6a76712aa5543dfb2e0a19b32b07"; 
const city = "Jinja,UG"; // Country code with no space
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

function displayWeather(data) {
  console.log("Data from API:", data); // Debug output

  const current = data.list[0]; // Get current forecast (3-hour window)
  const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  const currentWeather = `
    <div class="card">
      <h3>Current Weather</h3>
      <p>Temperature: ${Math.round(current.main.temp)}°C</p>
      <p>Condition: ${current.weather[0].description}</p>
    </div>
  `;

  const forecast = forecastDays.map(day => {
    const date = new Date(day.dt_txt);
    return `
      <div class="card">
        <h4>${date.toLocaleDateString('en-US', { weekday: 'long' })}</h4>
        <p>${Math.round(day.main.temp)}°C</p>
        <p>${day.weather[0].description}</p>
      </div>
    `;
  }).join("");

  weatherContainer.innerHTML = `
    ${currentWeather}
    <div class="forecast">${forecast}</div>
  `;
}

async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error loading weather:", error);
    weatherContainer.innerHTML = `<p class="error">Unable to load weather data.</p>`;
  }
}

getWeather();
