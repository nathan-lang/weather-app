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
  document.body.replaceChild(displayAPIinfo(data), oldWeatherInfo);
});
