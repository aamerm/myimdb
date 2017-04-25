module.exports = function(app) {
	var movies = require('../controllers/moviesController');

	app.route('/movies')
		.get(movies.list_all_movies)
		.post(movies.add_movie);

	app.route('/movies/:id')
		.get(movies.get_movie)
		.put(movies.update_movie)
		.delete(movies.delete_movie);
};