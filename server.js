var express     =   require("express");
var app         =   express();
var port        =   process.env.PORT || 3000;
var mongoose 	  = 	require('mongoose');
var movies      =   require("./models/moviesModel");
var bodyParser  =   require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myimdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var routes = require('./routes/moviesRoutes');
routes(app);

app.listen(port);
console.log('myimdb RESTful API server started on: ' + port);
