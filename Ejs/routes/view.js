var express = require('express')
var app = express()
console.log("File loaded - vproduct.js");



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

module.exports = app