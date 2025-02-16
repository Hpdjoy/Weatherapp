const searchbtn = document.querySelector('#searchbtn');
const searchinput = document.querySelector('#searchinput');
const tempElem = document.querySelector('.temprature');
const locationElem = document.querySelector('.location');
const timeElem = document.querySelector('.time');
const dateElem = document.querySelector('.date');
const emojiElem = document.querySelector('.emoji');
const conditionElem = document.querySelector('.condition');
const precipatationElem = document.querySelector('#precipitation'); 
const humidityElem = document.querySelector('#humidity');
const windElem = document.querySelector('#wind');



searchbtn.addEventListener('click', async () => {
      const location = searchinput.value;
      if (location != "") {
            //data get 
            const data = await fetchWeatherData(location);

            if (data == null) {
                  console.log("Location not found");
                  alert("location info not found!");
            } else {
                  updateDom(data);
            }

            searchinput.value = "";
      }
});

function updateDom(data) {
      const location = data.location.name;
      const localTime = data.location.localtime;
      const [date, time] = localTime.split(" ");
      const icon = data.current.condition.icon;
      const text = data.current.condition.text;
      const temp = data.current.temp_c;
      const precipatation = data.current.precip_mm;
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;

      console.log(location, date, time, icon, text, temp, precipatation, humidity, wind);


      locationElem.textContent = location;
      timeElem.textContent = time;
      dateElem.textContent = date;
      emojiElem.src = icon;
      conditionElem.textContent = text;
      tempElem.textContent = temp;
      precipatationElem.textContent = precipatation;
      humidityElem.textContent = humidity;
      windElem.textContent = wind;




}


async function fetchWeatherData(location) {
      const url = `http://api.weatherapi.com/v1/current.json?key=fc5f9ceabaa243aca57200406251402&q=${location}&aqi=yes`;
      const response = await fetch(url);
      if (response.status == 400) {
            console.log("Location not found");
            return null;
      }
      else if (response.status == 200) {
            const data = await response.json();
            console.log(data);
            return data;
      }
}
console.log("Hello World");