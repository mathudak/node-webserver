const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
let app = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcom to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fullfil this request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port: 3000');
});