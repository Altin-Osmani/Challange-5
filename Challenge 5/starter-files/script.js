const weatherData = [
    { city: 'New York', temperature: 16, humidity: 70, windSpeed: 7 },
    { city: 'London', temperature: 12, humidity: 80, windSpeed: 5 },
    { city: 'Tokyo', temperature: 22, humidity: 60, windSpeed: 4 },
    { city: 'Sydney', temperature: 25, humidity: 50, windSpeed: 6 },
    { city: 'Paris', temperature: 15, humidity: 65, windSpeed: 5 },
    { city: 'Berlin', temperature: 14, humidity: 60, windSpeed: 6 },
    { city: 'Moscow', temperature: 5, humidity: 75, windSpeed: 10 },
    { city: 'Toronto', temperature: 17, humidity: 55, windSpeed: 8 },
    { city: 'Rio de Janeiro', temperature: 26, humidity: 85, windSpeed: 7 },
    { city: 'Beijing', temperature: 20, humidity: 40, windSpeed: 3 },
    { city: 'Mumbai', temperature: 30, humidity: 70, windSpeed: 5 },
    { city: 'Los Angeles', temperature: 19, humidity: 65, windSpeed: 4 },
    { city: 'Cape Town', temperature: 18, humidity: 60, windSpeed: 6 },
    { city: 'Rome', temperature: 21, humidity: 55, windSpeed: 3 },
    { city: 'Bangkok', temperature: 33, humidity: 75, windSpeed: 2 },
    { city: 'Istanbul', temperature: 20, humidity: 60, windSpeed: 4 },
    { city: 'Lagos', temperature: 29, humidity: 80, windSpeed: 3 },
    { city: 'Buenos Aires', temperature: 23, humidity: 70, windSpeed: 5 },
    { city: 'Chicago', temperature: 10, humidity: 65, windSpeed: 7 },
    { city: 'Shanghai', temperature: 19, humidity: 80, windSpeed: 6 },
  ];
  
  //funksioni i cili ben find ne baze te asaj se cfar shkruan useri
//filtrimi do behet ne baze te cityt
     function fetchWeatherData (city)  {
    return weatherData.find((weather) => weather.city.toLowerCase() === city.toLowerCase());
  };
  

  //funksioni i cili shfaq te dhenat ne DOM
    function displayWeatherData(data) {
      //kapim divin
    const weatherDisplay = document.getElementById('weatherDisplay');
  
      //kontrollojme nese inputi permban te dhena, nese jo shfaqim errorinn
    if (!data) {
      weatherDisplay.innerHTML = '<p>City not found</p>';
      return;
    }
  
      //ktu shfaqim te dhenat ne formen e kartes
    const weatherHtml = `
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">${data.city}</h4>
          <p class="card-text">Temperature: ${data.temperature}°C</p>
          <p class="card-text">Humidity: ${data.humidity}%</p>
          <p class="card-text">Wind Speed: ${data.windSpeed} km/h</p>
        </div>
      </div>
    `;
    weatherDisplay.innerHTML = weatherHtml;
  };
  
//funksioni i cili do gjeneroje parashikimin per 5 dit
  function fetchForecast (city) {

    //find-in ne baze te city e ruajme ne nje variabel
    const weather = fetchWeatherData(city);
    if (!weather) return null;
  
    //krijojm nje array bosh per forcast-in
    const forecast = [];

    //dhe iterojme duke kriju nje objekt qe do inicializojme dy key value e se cilave do krijohet ne menyre dinamike
    for (let i = 0; i < 5; i++) {

      //krijojm nje objekt per te i grumbullu te dhenat  
      const forcastData = {
        day: `Day ${i+1}`,                    //inicializojme nje key 'day' per diten e cila do rritet +1
        temperature: weather.temperature + i,  //dhe temperature ku si  value kapim arrayn qe i beme find.temperature
      } 

      //dhe me pas i bejme push tek array bosh
      forecast.push(forcastData);
    }
    return { city: weather.city, forecast };
  };
  

  //funksioni i cili do shfaqi forcastin-in ne DOM
   function displayForecast (data) {

    //kapim divin dhe kontrollojme 
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!data) return;
 
    let forecastHtml = `
      <div class="card mt-3">
        <div class="card-body">
          <h4 class="card-title">5-day Forecast for ${data.city}</h4>
    `;
  
    data.forecast.forEach((day) => {
      forecastHtml += `<p class="card-text">${day.day}: Temperature: ${day.temperature}°C</p>`;
    });
  
    forecastHtml += `
        </div>
      </div>
    `;
    weatherDisplay.innerHTML += forecastHtml;
  };
  
//funskioni i butonit
//gjithqka ndodh ne onclick te butonit
//prandaj ktu do therriten te gjitha eventet
 function searchWeather  () {

  //kapim valuen e inputit per te i ber find
    const cityName = document.getElementById('cityName').value;
  
    //funksionin e find e ruajme ne nje   variabel 
    const weather = fetchWeatherData(cityName);

    // dhe me pas do ia kalojme si parameter funksionit i cili shfaq kartat ne DOM
    displayWeatherData(weather);
  
    //te njejten gje bejme edhe me forcast
    const forecast = fetchForecast(cityName);
    displayForecast(forecast);
  
    saveRecentSearch(cityName);
    displayRecentSearches();
  };
  

  // funksioni per kerkimet e fundit qe ben useri
   function saveRecentSearch  (city) {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    if (!recentSearches.includes(city)) {
      recentSearches.push(city);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  };
  
//funksioni i cili shfaq kerkimet e fundit ne DOM
 function displayRecentSearches  () {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    //perdorim metoden 'map' per te na kthyre nje array te ri me ndryshimet e bera
    const recentSearchesHtml = recentSearches.map((city) => {
      return `<button class="btn btn-link" onclick="handleRecentSearchClick('${city}')">${city}</button>`;
    }).join(''); //perodrim join per te bashkuar stringjet ne nje string te vetem
    document.getElementById('recentSearches').innerHTML = recentSearchesHtml;
  };
  

