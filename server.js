const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path');


const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;


const db = 'mongodb+srv://Pavel:529440@cluster0.x0pym.mongodb.net/node-block?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then((res)=> console.log('Successfuly connected to DB'))
  .catch((error)=> console.log('Error connecting to'))



app.listen(PORT,  (error)=>{
  error ? console.error(error) : console.log(`listening to port ${PORT}`);
});

app.use(express.static('styles'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(postRoutes);
app.use(contactRoutes);

app.get('/', (req, res)=>{
  const title = "Home";
  res.render(createPath('index'), {title});
});


app.get('/about-us', (req, res)=>{
  res.redirect('/contacts');
});


app.use((req, res)=>{
  const title = 'Error';
  res
  .status(404)
  .render(createPath('error'), {title});
})