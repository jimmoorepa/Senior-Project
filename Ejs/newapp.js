
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
//app.use(express.session());
//app.use(app.router);

/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())

var multer = require('multer');
var upload = multer();

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser)
//app.use(bodyParser.urlencoded({ extended: true }))
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
var SearchRouter = require('./routes/search');
var UsersRouter = require('./routes/signin');

var FooterRouter = require('./routes/footer');

app.use('/', indexRouter);
app.get('/footer', FooterRouter);

//===================================================
app.use('/products', productsRouter); 
app.use('/products/view/(:prodid)', productsRouter); 
app.post('/products/add', productsRouter);
//app.post('/products/edit/:prodid', productsRouter.edit);

//===================================================
app.use('/cart', CartRouter);
app.post('/cart/add?(:prodId)', CartRouter);
app.post('/cart/checkout', CartRouter);
//app.use('/cart/del?(:prodId)', CartRouter);
//===================================================
app.get('/search?(:searchtext)', urlencodedParser, SearchRouter);
app.post('/search?(:searchtext)', urlencodedParser, SearchRouter);

//===================================================
app.use('/signin/', UsersRouter);
app.get('/signin/auth_login', UsersRouter);
app.post('/signin/auth_login', UsersRouter);
app.post('/signin/auth_register', UsersRouter);
app.post('/signin/register', UsersRouter);

var sessionData = app.session;
/*
app.get('/',function(req,res){ session
   res.sendfile("login.ejs");
});
 app.post('/login',function(req,res){
   var user_name=req.body.user;
   var password=req.body.password;
   console.log("User name = "+user_name+", password is "+password);
   res.end("yes");
});
}); */

//console.log(productsView);
//app.get('view/:prodid', productsView.prod_view);
//app.post('/products/add', productsRouter.add);
//app.post('/products/edit/:prodid', productsRouter.edit);

app.listen(app.get('port'), function () {
  console.log('Express started on http://jmoore.it.pointpark.edu:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});

module.exports = app;
