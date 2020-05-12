const fs = require('fs');
// for network capabailities and to build http server
const http = require('http');
const url = require('url');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// FILES

// Blocking, Synchronous way
// const textIn = fs.readFileSync('./1-Node-farm/txt/input.txt', 'utf-8') ;
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./1-Node-farm/txt/output.txt', textOut)

// console.log("File Written!");

// Non-Blocking, Asynchronous way
//fs.readFile('./1-Node-farm/txt/start.txt', 'utf-8', (err, data1) => {
//  if(err) return console.log('ERROR!');
//  fs.readFile(`./1-Node-farm/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//   console.log(data2);
//      fs.readFile('./1-Node-farm/txt/append.txt', 'utf-8', (err, data3) => {
//        console.log(data3);

//       fs.writeFile('./1-Node-farm/txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//          console.log("Your file has been written!");
//        });
//    });    
//  });
//});

//console.log("will read file!");

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// SERVER


// we use sybchronous, as this code will be only executed once.
//./ indicates where script is running, __dirname indicates while current file located
const data = fs.readFileSync(`${__dirname}/1-Node-farm/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  }
  else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  }
  else if (pathName === '/api') {
    res.writeHead(200, {'Content-type': 'application/json' });
    res.end(data);
  }
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header':'Hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log("Lstening to request on port 8000");
} );