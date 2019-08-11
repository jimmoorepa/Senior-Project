var express = require('express')
var app = express() 
var routes = require('./routes');
 
// Handles the MySQL Connection
var mysql = require('mysql')
var myConnection  = require('express-myconnection')

var config = require('./db')
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.database
}

app.use(myConnection(mysql, dbOptions, 'pool'))

// Sets up the templating view engine
app.set('view engine', 'ejs')

// Runs on port 3000
app.set('port', process.env.PORT || 3000);
 
// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())

/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var methodOverride = require('method-override') 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var CartRouter = require('./routes/cart');

app.use('/', indexRouter);
app.use('/products', productsRouter); 
app.use('/products/view/(:prodid)', productsRouter); 
app.use('/cart/cart', indexRouter);

//console.log(productsView);
//app.get('view/:prodid', productsView.prod_view);
//app.post('/products/add', productsRouter.add);
//app.post('/products/edit/:prodid', productsRouter.edit);

app.listen(app.get('port'), function () {
  console.log('Express started on http://jmoore.it.pointpark.edu:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});

module.exports = app;