const express = require('express');

const app = express();

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));