// Setting up prerequisite modules
var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Runs on port 3001
app.set('port', process.env.PORT || 3001);

// Handler for public files in the /public folder
app.use(express.static(__dirname + '/public'));

// Handlers for each page we need.  These will cover the use cases.
app.get('/', function (req, res) {
  res.render('landing',
    {
<<<<<<< HEAD
      page: 'landing',
      title: 'Home',
    }
=======
	  page: 'landing',
	  title:  'Home',
	  product1:  [
	    {
		  name:  'Carrots',
		  shortDescription:  'Carrots',
		  price:  '3.00',
		},
		{
		  name:  'Potato',
		  shortDescription:  'Potato',
		  price:  '6.50',
		},
		{
		  name:  'Cheddar Cheese',
		  shortDescription:  'Cheddar Cheese',
		  price:  '12.99',
		},
		{
		  name:  'Strawberry Jam',
		  shortDescription:  'Strawberry Jam',
		  price:  '4.95',
		}
	  ],
	  product2:  [
	    {
		  name:  'Carrots',
		  shortDescription:  'Carrots',
		  price:  '3.00',
		},
		{
		  name:  'Potato',
		  shortDescription:  'Potato',
		  price:  '6.50',
		},
		{
		  name:  'Cheddar Cheese',
		  shortDescription:  'Cheddar Cheese',
		  price:  '12.99',
		},
		{
		  name:  'Strawberry Jam',
		  shortDescription:  'Strawberry Jam',
		  price:  '4.95',
		}
	  ]
	}
>>>>>>> master
  );
});

app.get('/result', function (req, res) {
  res.render('searchResults',
    {
      page: 'searchResults',
      title: 'Search Results',
    }
  );
});

app.get("/postproduct", function (req, res) {
  res.render("postproduct");
});

app.post('/postForm', function (req, res) {
  console.log(req.body);
  res.redirect("/postproduct");
})

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
  console.log('Express started on http://localhost: ' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
