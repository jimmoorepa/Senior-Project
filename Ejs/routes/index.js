var express = require('express')
var app = express()
console.log("File loaded - index.js");

/* 
app.get('/', function(req, res) {
	// render to views/index.ejs template file
	res.render('index', {title: 'Exploring my database.'})
})
*/

app.get('/', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	req.getConnection(function(error, conn) { 
	  conn.query('SELECT * FROM product where Available = 1 LIMIT 4',
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

 
/** 
 * We assign app object to module.exports
 * res.render('index', { data: req.data });
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
