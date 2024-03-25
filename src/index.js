import "./style.css";
import {
  navbar,
  logAPIinfo,
  displayAPIinfo,
  enterCity,
} from "./pageSections.js";

document.body.appendChild(navbar());
let data = await logAPIinfo("london");
document.body.appendChild(displayAPIinfo(data));
document.body.appendChild(enterCity());
const button = document.querySelector(".enter-button");

button.addEventListener("click", async function () {
  const input = document.getElementById("city");
  data = await logAPIinfo(input.value);
  if (data === null) {
    return;
  }
  const oldWeatherInfo = document.querySelector(".weather");
  oldWeatherInfo.style.transition = "0.5s";
  oldWeatherInfo.style.opacity = 0;
  setTimeout(function () {
    setTimeout(function () {
      const newWeatherInfo = document.querySelector(".weather");
      newWeatherInfo.style.opacity = 1;
    }, 500);
    const newWeatherInfo = displayAPIinfo(data);
    newWeatherInfo.style.opacity = 0;
    newWeatherInfo.style.transition = "opacity 0.5s ease-out";
    document.body.replaceChild(newWeatherInfo, oldWeatherInfo);
  }, 500);
});
