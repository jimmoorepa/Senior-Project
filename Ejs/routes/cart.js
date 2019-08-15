<<<<<<< HEAD
var express = require('express')
var app = express()
var router = express.Router();
console.log("File loaded - cart.js");

/*

app.get('/cart', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	req.getConnection(function(error, conn) { 
	  conn.query('SELECT * FROM product where Available = 1',
		function(err, rows, fields) {
			var prodId = '1'; //req.params.prodid;
			var prodQuery = "SELECT * FROM product WHERE idProduct = '";
			conn.query(prodQuery + prodId + "'", function(err, rows, fields) { 
            
			if(err)
              console.log("Error Selecting : %s ",err );
     
              res.render('/cart',{title:"Products - Node.js",data:rows});
		}) 
	})
  })
})
*/
 
router.get('/', function(req, res, next) {	
	res.render('cart', {
	title: 'Shopping Cart', 
	//data: ''
	})
})
 
router.get('/add(:prodId)', function(req, res, next) {	
	res.render('cart', {
	title: 'Shopping Cart', 
	//data: ''
	})
})

module.exports = router
=======
var express = require('express')
var app = express()
console.log("File loaded - view.js");

/*

app.get('/:prodid', function(req, res, next) {	
	//res.render('index', {title: 'Farmers Market Site'})
	req.getConnection(function(error, conn) { 
	  conn.query('SELECT * FROM product where Available = 1',
		function(err, rows, fields) {
			var prodId = '1'; //req.params.prodid;
			var prodQuery = "SELECT * FROM product WHERE idProduct = '";
			conn.query(prodQuery + prodId + "'", function(err, rows, fields) { 
            
			if(err)
              console.log("Error Selecting : %s ",err );
     
              res.render('products/view',{title:"Products - Node.js",data:rows});
		}) 
	})
  })
})
*/

module.exports = app
>>>>>>> af2c6f46924961892833c232c4553412cf94e43a
