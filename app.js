const formData = document.querySelector("form");
const colourSelector = document.querySelector("#colour-selector");
const selectedValue = document.querySelector("select[name='colours']");
const getColours = document.querySelector("#colour-get");
const colourDisplay = document.querySelector(".colour-container");
const colourValues = document.querySelector(".colour-values");

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
      for (let i = 0; i < data.colors.length; i++) {
        colourDisplay.innerHTML += `
          <div class="colours">
            <img width="100%" height="100%" src="${data.colors[i].image.bare}"></img>
            <h3>${data.colors[i].hex.value}</h3>
          </div>
        `;
      }
    });
  colourDisplay.innerHTML = "";
});

colourDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  // Check if the clicked element is an image
  if (e.target.tagName === "IMG") {
    // Get the hex value from the sibling h3 element
    const hexValue = e.target.nextElementSibling.textContent;

    navigator.clipboard.writeText(hexValue).then(() => {
      // Optional: Provide user feedback
      alert(`Copied ${hexValue} to clipboard!`);
    });
  }
});
