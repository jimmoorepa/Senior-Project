var express = require('express')
var app = express()
var router = express.Router();
console.log("File loaded - cart.js");

/*

app.get('/cart', function(req, res, next) {		
	req.getConnection(function(error, conn) {
	  var prodId = req.params.prodId;
	  console.log("prodId = " + prodId);
      var prodQuery = "SELECT * FROM product WHERE idProduct = '" + prodId + "'";
		conn.query(prodQuery, function(err, rows, fields) {
			if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('/cart', {
				title: 'Shopping Cart', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Sales table - index"); 
			res.render('/cart', {
				title: 'Shopping Cart', 
				data: rows				
			})
				
		  }
		}) 
	})
})
=============================================
 

=============================================
*/
 
router.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
	  var tableId = "FoodCoop.PurchaseHistory";
	  var SelectFields = "idCustomer, PurHistID, Quantity, PurPrice, product.Name, ";
	  SelectFields = SelectFields + "PurchaseStatus, ShortDescription, CustFName, ";
	  SelectFields = SelectFields + "CustLName, CustLineAddr, CustCity, CustState, ";
	  SelectFields = SelectFields + "CustZip, idProduct";
	  var FromStatement = "PurchaseHistory ";
	  var InnerJoin1 = "product on product.idProduct = PurchaseHistory.product_idProduct ";
	  var InnerJoin2 = "Customer on Customer.idCustomer = PurchaseHistory.Customer_idCustomer ";
      var whereClause = "PurchaseStatus = '1'";

	  var userId = "1"; //req.params.userId;
	  var PurHistID = "1"; //req.params.PurHistID;
	  //var PurchaseQuery = "SELECT * FROM " + tableId + "  WHERE " + whereClause;

	  var PurchaseQuery = "Select " + SelectFields + " " 
	  	+ "From " + FromStatement 
	  	+ "Inner Join " + InnerJoin1
	  	+ "Inner Join " + InnerJoin2
	  	+ "where " + whereClause;

	  console.log("PurchaseQuery = " + PurchaseQuery);
		conn.query(PurchaseQuery, function(err, Purrows, Purfields) {
			if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('cart', {
				title: 'Shopping Cart', 
				//data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Product table - index");
			//console.log("Purfields = " + Purfields); 
		  		res.render('cart', {
					title: 'Shopping Cart', 
					Purdata: Purrows  
				})
			}
		});
	});
}) 
 
router.post('/add?(:prodId)', function(req, res, next) {
	// prodName, qtySelected, price, desc
	console.log("Adding item to cart");
	var tableId = "FoodCoop.PurchaseHistory";
	var userId = "1"; //req.params.userId;
	var PurHistID = "1"; //req.params.PurHistID;
	var purchase_data = {
        PurHistID: '2',
        Customer_idCustomer: '1',
        product_idProduct: (req.params.prodId),
        Quantity: req.body.qtySelected,
        PurPrice: req.body.price,
        DateTime: '2019-08-22 15:30:00',
        PurchaseStatus: '1'
    };
    //console.log("data: " + Number(req.params.prodId));
	req.getConnection(function(error, conn) {
		conn.query('INSERT INTO ' + tableId + ' SET ?', purchase_data, (err, results) => {
			if (err) {
			console.log("Error: " + err);
				console.log("Did not update PurchaseHistory");
			} else {
				console.log('Data inserted!', results);
				res.render('/cart', {
					title: 'Shopping Cart', 
					//data: ''
				})
			}
		});
    });
	
})


app.post('/checkout', function(req, res, next) {		
	req.getConnection(function(error, conn) {
		var tableId = "FoodCoop.PurchaseHistory";
		var userId = "1"; //req.params.userId;
		var PurHistID = "1"; //req.params.PurHistID;
		var prodId = req.params.prodId;
		var outWhere = "where PurHistID = '" + PurHistID 
				+ "' and product_idProduct = '" + prodId + "'";
		console.log("prodId = " + prodId);
		// This needs to update each item from the cart to set the
		// Purchase status flag as "2" so the items do not return to cart.
		// Then processing the order begins.
    	var prodQuery = "Update " + tableId + " set PurchaseStatus = '2' " + outWhere;
		conn.query(prodQuery, function(err, rows, fields) {
			if (err) {
			console.log("Error: " + err);
			req.flash('error', err)
			res.render('/cart', {
				title: 'Shopping Cart', 
				data: ''
			})
		  } else {
			// render to views/user/list.ejs template file
			console.log("Connected to Sales table - index"); 
			res.render('/cart', {
				title: 'Shopping Cart', 
				data: rows				
			})
				
		  }
		}) 
	})
})

module.exports = router