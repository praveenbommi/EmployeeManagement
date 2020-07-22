const express = require('express');
const bodyParser = require("body-parser");
const router = require('./route/routing');
// const fileroute = require('./route/file');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     next();
//   });


app.use('/', router);
app.listen(3000);
console.log("Server listening in port 3000");
