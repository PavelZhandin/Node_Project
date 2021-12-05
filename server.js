const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contact = require('./models/Contact');
const methodOverride = require('method-override');

const postRoutes = require('./routes/post-routes');

app.set('view engine', 'ejs');

const app = express();
const PORT = 3000;


const db = 'mongodb+srv://Pavel:529440@cluster0.x0pym.mongodb.net/node-block?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then((res)=> console.log('Successfuly connected to DB'))
  .catch((error)=> console.log('Error connecting to'))

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT,  (error)=>{
  error ? console.error(error) : console.log(`listening to port ${PORT}`);
});

app.use(express.static('styles'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.get('/', (req, res)=>{
  const title = "Home";
  res.render(createPath('index'), {title});
});

app.get('/contacts', (req, res)=>{
  const title = "Contacts";
  Contact
      .find()
      .then((contacts)=> res.render(createPath('contacts'), {contacts, title}))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), {title: "Error"})
      });
 
})

app.get('/about-us', (req, res)=>{
  res.redirect('/contacts');
});


app.use((req, res)=>{
  const title = 'Error';
  res
  .status(404)
  .render(createPath('error'), {title});
})