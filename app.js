const formData = document.querySelector("form");
const colourSelector = document.querySelector("#colour-selector");
const selectedValue = document.querySelector("select[name='colours']");
const getColours = document.querySelector("#colour-get");
const colourDisplay = document.querySelector(".colour-container");
const colourValues = document.querySelector(".colour-values");

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  // Removes the # from the hex value for api use
  let colourValue = colourSelector.value.slice(1);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colourValue}&mode=${selectedValue.value}`,
    {
      method: "Get",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // Loops through the colors array in the api call
      for (let i = 0; i < data.colors.length; i++) {
        // Creates the elements with the image and hex value data
        colourDisplay.innerHTML += `
          <div class="colours">
            <img width="100%" height="100%" src="${data.colors[i].image.bare}"></img>
            <h3>${data.colors[i].hex.value}</h3>
          </div>
        `;
      }
    });
  // Resets the innerHTML to prevent adding on to existing api calls
  colourDisplay.innerHTML = "";
});

colourDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  // Check if the clicked element is an image
  if (e.target.tagName === "IMG") {
    // Get the hex value from the sibling h3 element
    const hexValue = e.target.nextElementSibling.textContent;

    navigator.clipboard.writeText(hexValue).then(() => {
      // Provide user feedback
      alert(`Copied ${hexValue} to clipboard!`);
    });
  }
});
