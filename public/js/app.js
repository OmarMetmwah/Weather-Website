let weatherForm = document.querySelector("form");
let result = document.querySelector("#result");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  result.innerText = "Loading....";
  let address = document.getElementById("addressInput").value;
  fetch(`http://127.0.0.1:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        result.textContent = data.error;
      } else {
        result.innerText = `Address: ${data.address}
        Location: ${data.location}
        Temperature: ${data.temperature} degree
        Weather Descriptions: ${data.weatherDescriptions}`;
      }
    });
  });
});
