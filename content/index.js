// Setting up prerequisite modules
var express = require('express');
var app = express();
var path = require('path');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

// Runs on port 3001
app.set('port', process.env.PORT || 3001);

// Handler for public files in the /public folder
app.use(express.static(__dirname + '/public'));

// Handlers for each page we need.  These will cover the use cases.
app.get('/', function(req, res) {
  res.render('landing', {
	  page: 'landing',
	  title:  'Home',
	}
  );
});

app.get('/searchResults', function(req, res) {
  res.render('searchResults', {
	  page:  'searchResults',
	  title:  'Search Results',
	});
});

app.get('/product', function(req, res) {
  res.render('product', {
	  page:  'product',
	  title:  'Product Details',
	});
});

app.get('/shop-cart', function(req, res) {
  res.render('shop-cart', {
	  page:  'shop-cart',
	  title:  'Shopping Cart',
	});
});

app.get('/shop-cart', function(req, res) {
  res.render('shop-cart', {
	  page:  'shop-cart',
	  title:  'Shopping Cart',
	});
});



// 404 error when a file or page is not found
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// 500 page when something fails to process
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

// The listener. 
app.listen(app.get('port'), function () {
  console.log('Express started on http://jmoore.it.pointpark.edu:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
