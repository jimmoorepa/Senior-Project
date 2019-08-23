var express = require('express')
var app = express()
var router = express.Router();
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
			//console.log("L-67" + res.rows.image);
			res.render('products/view', {
				title: 'Product Details', 
				data: rows				
			})
				
		  }
		}) 
	})
})


app.get('/add', function(req, res, next) {	
	res.render('products/update', {
					title: 'Product Update'
				})
})

app.post('/add', function(req, res, next) {	
	var tableId = "FoodCoop.product";
	console.log("Adding item to " + tableId);
	var stringToTrim = req.body.inputProductDescription;
	var trimmedString = stringToTrim.substring(0, 15);
	var product_data = {
        idProduct: '0',
        Name: req.body.inputProductName,
        ShortDescription: trimmedString,
        Description: req.body.inputProductDescription,
        Price: req.body.inputProductPrice,
        Available: req.body.IsAvailable,
        productcol: '0',
        idVendor: '2',
        image: ''
    }; //inputFoodType 

	req.getConnection(function(error, conn) {
		conn.query('INSERT INTO ' + tableId + ' SET ?', product_data, (err, results) => {
			if (err) {
			console.log("Error: " + err);
				console.log("Did not update products");
			} else {
				console.log('Data inserted!', results);
				res.redirect('/')
			}
		});
    });
	

})

app.get('/edit', function(req, res, next) {	
	req.getConnection(function(error, conn) { 
	
	// Maybe find if the product exists first.
	// If product exists update
	// else insert new product into table.
		var prodQuery = "";
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
			console.log("Connected to Product table - insert");	
			res.render('products/view', {
				title: 'Product Details', 
				data: rows
			})
		  }
		})
	})
})

// products/add
// router.get('/cart', function(req, res, next) {

/*
var file_name = e.target.files[0].name; // e is the event
var files = e.target.files;
var data = new FormData();
var self = this;

for (var i = 0; i < files.length; i++) {
	var file = files.item(i);
	data.append('file', file, file.name);
}

Axios.post('routes/uploadProdImg', data, {
	headers: { 'content-type': 'multipart/form-data'}
})
  .then(res => {
	console.log(res.data);
  })

var multer = require('multer');
var upload = multer({ dest: 'uploads/'})

app.post('/routes/uploadProdImg', upload.single('file'), function (req, res, next) {
	var imageData = fs.readFileSync(req.file.path);

})

res.then(res => {
					console.log("L-67" + res.data.image);	
					var imageURL = 'data:image/jpeg;base64,' + 
					new Buffer(res.data.image, 'binary').toString('base64');
				})
*/

module.exports = app
