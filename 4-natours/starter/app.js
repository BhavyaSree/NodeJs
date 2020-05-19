const fs = require('fs');
const express = require('express');


// Express() add express methods to variable app
const app = express();

// middleware between request and response.
app.use(express.json())

// //routing means how application responds to certain client requests, for certail url and for certain http methods used for request
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message :'Hello from the server side!', app:'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// route handler for GET request
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success', 
      results: tours.length,
      data: {tours: tours}
    });
});

// route handler for POST request  -- Generally, req will have data in this case. Express doesn't put the data in request. For this, we need a middleware
// On using middleware, the data will be available on the body of req.
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({ id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      res.status(201)
         .json({
           status: 'success',
           data: {tour: newTour}
         });
  });

});


// to start a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});



