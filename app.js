const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{

  res.sendFile(__dirname+"/index.html");

});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "2f17451bedead07fe743ed85dec4e755";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      
      res.write(`<p>The weather is ${description}</p>`);
      res.write(`<img src="${imageUrl}">`);
      res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius.</h1>`)
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("The server started on port 3000");
});

