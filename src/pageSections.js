import { weatherInit } from "./weatherObj.js";
import _ from "lodash";

export function navbar() {
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  const logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = "./weather-icon.png";
  console.log(logo);
  navbar.appendChild(logo);
  const text = document.createElement("div");
  text.textContent = "Weather App";
  navbar.appendChild(text);

  return navbar;
}

export async function logAPIinfo(city) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=379522648d834e03ac8162416241603&q=" +
      city,
    { mode: "cors" }
  );
  if (response.status === 400) {
    return null;
  }
  const data = await response.json();
  data.current.condition.icon =
    "https://" + _.trim(data.current.condition.icon, "/");
  return data;
}

export function displayAPIinfo(data) {
  const weatherObj = weatherInit(
    data.location.name,
    data.location.country,
    data.current.temp_c,
    data.current.condition.text,
    data.current.condition.icon
  );
  const weather = document.createElement("div");
  weather.classList.add("weather");
  const cityName = document.createElement("div");
  cityName.textContent = weatherObj.name;
  cityName.classList.add("city-name");
  const country = document.createElement("div");
  country.textContent = weatherObj.country;
  country.classList.add("country");
  const temp = document.createElement("div");
  temp.textContent = weatherObj.temp + "°C";
  let inCelsius = true;
  temp.addEventListener("click", function () {
    if (inCelsius) {
      temp.textContent = data.current.temp_f + "°F";
      inCelsius = false;
    } else {
      temp.textContent = data.current.temp_c + "°C";
      inCelsius = true;
    }
  });
  temp.classList.add("temp");
  const condition = document.createElement("div");
  condition.textContent = weatherObj.condition;
  condition.classList.add("condition");
  const conditionIcon = document.createElement("img");
  conditionIcon.src = weatherObj.icon;
  weather.appendChild(cityName);
  weather.appendChild(country);
  weather.appendChild(temp);
  weather.appendChild(condition);
  weather.appendChild(conditionIcon);
  return weather;
}

export function enterCity() {
  const formArea = document.createElement("div");
  formArea.classList.add("user-form");
  const form = document.createElement("form");
  form.id = "enterCity";
  const label = document.createElement("label");
  label.for = "enterCity";
  label.textContent = "Enter your city: ";
  const input = document.createElement("input");
  input.type = "text";
  input.id = "city";
  input.name = "city";
  input.required = "true";
  const button = document.createElement("button");
  button.classList.add("enter-button");
  button.type = "click";
  button.textContent = "Let's go!";
  form.appendChild(label);
  form.appendChild(input);
  formArea.appendChild(form);
  formArea.appendChild(button);
  return formArea;
}
