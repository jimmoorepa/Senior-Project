
var express = require('express')
var app = express()
var router = express.Router();
console.log("File loaded - signin.js");

//# render, and authorization
router.get('/', (req, res) => {
    res.render('signin', {
		title: 'User Sign-In'
	})
});

router.get('/home', (req, res) => {
    res.render('/');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/auth_login', (req, res) => {
	req.getConnection(function(error, conn) {
		var email = req.body.email;
        var password = req.body.password;
		var url = "/"; 
		console.log("email: " + email + " pass: " + password);

		if (email && password) {
			conn.query('SELECT * FROM user WHERE email = ? AND password = ?', 
			[email, password], (err, rows, results) => {
            if (err) throw err;
				if (results.length > 0) {
					var user = rows[0].name;
					console.log("results.name " + user);
					req.session.user = results.name;
					req.session.loggedin = true;
					req.session.loggedout = false;
					req.session.email = email;
					/*res.render(url, {
						user : req.user */
					var badAddr = "/"; 
					res.redirect(url);
					/*res.render(badAddr, {
						title: 'Home',
						user : user,
						data : ''});*/
				} else {
					res.json({
						code: 400,
						err: 'Incorrect credentials'
					});
				}
				res.end();
			});
		}
	});
});

router.post('/auth_register', (req, res) => {
    var register_data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
	req.getConnection(function(error, conn) {
		conn.query('INSERT INTO user SET ?', register_data, (err, results) => {
			if (err) throw err;
			else {
				console.log('Data inserted!', results);
				res.redirect('/signin')
			}
		});
    });
});

module.exports = router;