var express = require('express')
var app = express()
console.log("File loaded - product.js");

/*
 * SHOW LIST OF Available Products.

	  conn.query(prodQuery + prodId + "'", function(err, rows, fields) { 
   
 */

app.get('/view/(:prodId)', function(req, res, next) {	
	req.getConnection(function(error, conn) {
	  var prodId = req.params.prodId;
	  console.log("prodId = " + prodId);
      var prodQuery = "SELECT * FROM product WHERE idProduct = '" + prodId + "'";
		conn.query(prodQuery, function(err, rows, fields) {
			if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('products/view', {
				title: 'Product Details', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Product table - index");
			res.render('products/view', {
				title: 'Product Details', 
				data: rows 
			})
		  }
		}) 
	})
})

module.exports = app
