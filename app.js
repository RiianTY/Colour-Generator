const formData = document.querySelector("form");
const colourSelector = document.querySelector("#colour-selector");
const selectedValue = document.querySelector("select[name='colours']");
const getColours = document.querySelector("#colour-get");
const colourDisplay = document.querySelector(".colour-container");
const colourValues = document.querySelector(".colour-values");
const html = document.querySelector(".colour-container");

formData.addEventListener("submit", function (e) {
  e.preventDefault();

  let colorValue = colourSelector.value.slice(1);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${selectedValue.value}`,
    {
      method: "Get",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let html = document.querySelector(".colour-container");
      for (let i = 0; i < data.colors.length; i++) {
        html.innerHTML += `
          <div class="colours">
          <img width="100%" height="100%" src="${data.colors[i].image.bare}"></img>
          <h3>${data.colors[i].hex.value}</h3>
          </div>
        `;
      }
    });
  html.innerHTML = "";
});
