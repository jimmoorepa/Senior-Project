var express = require('express')
var app = express()
<<<<<<< HEAD
console.log("File loaded - index.js");
=======
console.log("File loaded -index.js");
>>>>>>> af2c6f46924961892833c232c4553412cf94e43a

/* 
app.get('/', function(req, res) {
	// render to views/index.ejs template file
	res.render('index', {title: 'Exploring my database.'})
})
*/

app.get('/', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	req.getConnection(function(error, conn) { 
	  conn.query('SELECT * FROM product where Available = 1',
		function(err, rows, fields) {
		  if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('index', {
				title: 'Index', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Product table - index");
			res.render('index', {
				title: 'Index', 
				data: rows 
			})
		  }
		}) 
	})
})


<<<<<<< HEAD
/*
// Search
app.get('/(:searchtext)', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	var searchString = req.body.searchtext; 
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
*/
=======
>>>>>>> af2c6f46924961892833c232c4553412cf94e43a
 
/** 
 * We assign app object to module.exports
 * res.render('index', { data: req.data });
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
