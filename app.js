const { read } = require('fs');
const http = require('http');

const PORT = 3000

const server = http.createServer((req, res)=>{
    console.log('Server request');
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'application/json');
    // res.write('<head><link rel = "stylesheet" href ="#"></head>')
    // res.write('<h1>Hello World!</h1>');
    // res.write('<p>This is paragraph</p>');

    const data = JSON.stringify([
      { name: 'Tommy', age: 35},
      { name: "Arthur", age: 40}
    ]);

    res.end(data);
});

server.listen(PORT, 'localhost', (error)=>{
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});