// Calling Unsplash API
// Getting background image & author name
let lon;
let lat;

fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=RYD8BDXw36XxEEc0URIbaQgqlXvKGmM7gRqmB9fzG3E")
    .then(rsp => rsp.json())
    .then(data => {
        document.querySelector("#author").textContent = data.user.name
        document.body.style.backgroundImage = `url(${data.urls.full})`
    })
    .catch(err => {
        console.log(err)

        const defaultImg = 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjEyOTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA2NjQ1NzQ&ixlib=rb-1.2.1&q=85';
        const defaultAuthor = 'Quino Al'

        document.body.style.backgroundImage = `url(${defaultImg})`;
        document.querySelector("#author").textContent = defaultAuthor;
    })


// Calling CoinGecko API
// Getting crypto name, image, and price

fetch("https://api.coingecko.com/api/v3/coins/crypto-com-chain")
    .then(rsp => rsp.json())
    .then(data => {
        const name = data.name;
        const image = data.image.small;
        const price = data.market_data.current_price.usd;

        document.querySelector("#crypto").innerHTML = `
        <div id="crypto-top">
            <image class="crypto-image" src="${image}" />
            <p class="crypto-name">${name}</p>
        </div>
        <p class="crypto-price">$${price.toFixed(4)}</p>
        `;
        const cryptoPrice = document.querySelector(".crypto-price");
    })
    .catch(err => console.log(err))

// OpenWeather API
function callOpenWeatherApi() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=fc739d09b5a3f1f5df587293a34fc6e6`)
        .then(rsp => {
            if (!rsp.ok) {
                throw error('Weather data not available');
            }
            return rsp.json();
        })
        .then(data => {
            console.log(data);
            const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            console.log(weatherIconUrl);
            document.querySelector("#weather").innerHTML = `
            <img class="weather-icon" src=${weatherIconUrl} alt=${data.weather[0].main} />
            <p>${data.main.temp}</p>
            `
        })
        .catch(err => console.error(err))
    }

// Calling OpenWeather API using latitude & longitude from Geolocation API
navigator.geolocation.getCurrentPosition((position) => {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    callOpenWeatherApi()
  });


// Updating time on screen every minute
function displayTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', {timeStyle: "short"});
    document.querySelector(".time").textContent = currentTime;
}

setInterval(displayTime, 1000)


