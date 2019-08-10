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

var credentials = require('./credentials.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Runs on port 3001
app.set('port', process.env.PORT || 3001);

// Handler for public files in the /public folder
app.use(express.static(__dirname + '/public'));

// Handlers for each page we need.  These will cover the use cases.
app.get('/', function (req, res) {
  getLandingProducts(function(results) {  
    //console.log(results);
    
    var products = JSON.parse(JSON.stringify(results));
    
    res.render('landing',
      {
        page: 'landing',
        title:  'Home',
        product1:  products,
      }
    );
  });
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
  
function getLandingProducts(cb) {

  var sql = mysql.createConnection(credentials);
  sql.connect();
  
  sql.query('SELECT Name, ShortDescription, Price FROM product LIMIT 8', function(error, results, fields) {
    if (error) throw error;
	  cb(results);
  });
  sql.end();
  //sql.disconnect();
}

// The listener. 
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost: ' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
