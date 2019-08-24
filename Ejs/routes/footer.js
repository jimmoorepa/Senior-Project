var express = require('express')
var app = express()
var router = express.Router();
console.log("File loaded - footer.js");



router.get('/about', function(req, res, next) {	
	res.render('/', {
		title: 'About Us'
	})
})

module.exports = router;