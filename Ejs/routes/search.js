
var express = require('express')
var app = express()
var router = express.Router();
console.log("File loaded - search.js");

// Search  (:searchtext) params body
router.use('/', function(req, res, next) {	
	req.getConnection(function(error, conn) {
	
	  var prodId = req.body.qtext;
	  console.log("body: " + req.body.qtext);
	  console.log("prodId = " + prodId);
	  var whereString = " Name = '" + prodId + "'";
	  
      var prodQuery = "SELECT * FROM product WHERE " + whereString;
		conn.query(prodQuery, function(err, rows, fields) {
			if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('search', {
				title: 'Results', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Product table - search");
			res.render('search', {
				title: 'Results', 
				data: rows 
			})
		  }
		}) 
	})
})
 
/*
router.get('/', function(req, res, next) {	
	res.render('search', {
	title: 'Results', 
	//data: ''
	})
	console.log("title: " + title);
})
 
*/


//module.exports = app;
module.exports = router;
