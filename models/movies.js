var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/myimdb');
var mongoSchema =   mongoose.Schema;
var movieSchema  = {
    "name" : String,
    "language" : String,
    "year_released": Number
};
module.exports = mongoose.model('movies',movieSchema);
