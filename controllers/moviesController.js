var mongoose = require('mongoose');
var Movies = mongoose.model('movies');

exports.list_all_movies = function(req,res){
	var response = {};
	Movies.find({},function(err,data){
		// Mongo command to fetch all data from collection.
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			response = {"error" : false,"message" : data};
		}
		res.json(response);
	});
};

exports.add_movie = function(req,res){
	var db = new Movies();
	var response = {};
	// Add strict validation when you use this in Production.
	db.name = req.body.name;
	db.language = req.body.language;
	db.year_released = req.body.year_released;
	db.save(function(err){
		// save() will run insert() command of MongoDB.
		// it will add new data in collection
		if(err) {
			response = {"error" : true,"message" : "Error adding data"};
		} else {
			response = {"error" : false,"message" : "Data added"};
		}
		res.json(response);
	});
};

exports.get_movie = function(req,res){
	var response = {};
	Movies.findById(req.params.id,function(err,data){
		// This will run Mongo Query to fetch data based on ID.
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			response = {"error" : false,"message" : data};
		}
		res.json(response);
	});
};

exports.update_movie = function(req,res){
	var response = {};
	// first find out record exists or not
	// if it does then update the record
	Movies.findById(req.params.id,function(err,data){
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			// we got data from Mongo.
			// change it accordingly.
			if(req.body.name !== undefined) {
				// case where email needs to be updated.
				data.name = req.body.name;
			}
			if(req.body.language !== undefined) {
				// case where password needs to be updated
				data.language = req.body.language;
			}
			if(req.body.year_released !== undefined) {
				// case where password needs to be updated
				data.year_released = req.body.year_released;
			}
			// save the data
			data.save(function(err){
				if(err) {
					response = {"error" : true,"message" : "Error updating data"};
				} else {
					response = {"error" : false,"message" : "Data is updated for "+req.params.id};
				}
				res.json(response);
			})
		}
	});
};

exports.delete_movie = function(req,res){
	var response = {};
	// find the data
	Movies.findById(req.params.id,function(err,data){
		if(err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else {
			// data exists, remove it.
			Movies.remove({_id : req.params.id},function(err){
				if(err) {
					response = {"error" : true,"message" : "Error deleting data"};
				} else {
					response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
				}
				res.json(response);
			});
		}
	});
};
