const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Omar'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Omar'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Omar',
    helpMSG: 'This is help page!'
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, { temperature, weatherDescriptions } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        location,
        temperature,
        weatherDescriptions
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Omar',
    errorMSG: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Omar',
    errorMSG: 'Page Not Found'
  });

  // res.sendFile(path.join(__dirname, '../public/images/' + req.query.name));
});
app.listen(port, () => {
  console.log('Server is up on port '+port);
});
