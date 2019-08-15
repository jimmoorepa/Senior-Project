// Search API
// search-api.js
var express = require('express')
var app = express()

$("#submit").on("click", function(event) {

	var searchString = $('input[id=searchtext]').val();
	
	// Search
	app.get('/(:searchtext)', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	//var searchString = req.body.searchtext; 
	req.getConnection(function(error, conn) {
		var whereClause = "Name = '" + searchString;
			console.log("whereClause: " + whereClause);
	  conn.query('SELECT * FROM product where ' + whereClause + "'",
		function(err, rows, fields) {
		  if (err) {
			console.log(err);
			req.flash('error', err)
			res.render('index', {
				title: 'Results', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Product table - Results");
			res.render('index', {
				title: 'Results', 
				data: rows 
			})
		  }
		}) 
	})
})

});