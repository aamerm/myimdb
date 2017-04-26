var express     =   require("express");
var app         =   express();
var mongoose    =   require('mongoose');
var bodyParser  =   require("body-parser");
var config      =   require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var routes = require('./routes/moviesRoutes');
routes(app);

app.listen(config.port);
console.log('myimdb RESTful API server started on: ' + config.port);

mongoose.connection.on('connected', function () {
	console.log('db connection open to ' + config.db);
});

module.exports = app; // for integration tests