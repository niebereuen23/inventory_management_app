const express = require('express');
const path = require('node:path');
const { indexRouter } = require('./routes/indexRouter');
const { apiRouter } = require('./routes/api/forIndex');

const app = express();

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`${new Date()}:\nServer running on port ${PORT}...`);
})