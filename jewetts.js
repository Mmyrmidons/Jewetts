const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')
const args = require('yargs').argv
const handlebars = require('express-handlebars').create({
	defaultLayout: 'anni-kins',
	helpers: {
		section: function(name, options) {
			if (!this._sections)
				this._sections = {}
				
			this._sections[name] = options.fn(this)
			return null
		}
	}	
})
const pjson = require('./package.json')

const port = args.port || 80
const securePort = args.securePort || 443

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// app.use(function(req, res, next) {
// 	if (req.headers.host == "localhost" || req.secure)
// 		next()
// 	else
// 		res.redirect("https://" + req.headers.host.replace(/\d+$/, securePort))
// })

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/about', function(req, res) {nnne
   res.render('about')
})

app.get('/cheeses', function(req, res) {
   res.render('cheeses')
})

app.get('/brochure', function(req, res) {
   res.render('brochure')
})

app.get('/goodies', function(req, res) {
   res.render('goodies')
})

app.get('/gifts', function(req, res) {
   res.render('gifts')
})

app.get('/orderinfo', function(req, res) {
   res.render('orderinfo')
})

app.get('/location', function(req, res) {
   res.render('location')
})

app.get('/events', function(req, res) {
   res.render('events')
})

app.get('/customers', function(req, res) {
   res.render('customers')
})

app.get('/comment', function(req, res) {
   res.render('comment')
})

app.get('/annikins', function(req, res) {
	res.render('index', {
        layout: 'anni-kins'
    })
})


app.use(function(req, res, next) {
	res.status(404)
	res.render('404')
})

app.use(function(err, req, res, next) {
	console.error("Deerman's 500 Error = " + err.stack)
	
	res.status(500)
	res.render('500')
})

// try {
// 	const privateKey = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/privkey.pem', 'utf8');
// 	const certificate = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/cert.pem', 'utf8');
// 	const ca = fs.readFileSync('/etc/letsencrypt/live/' + pjson.domain + '/chain.pem', 'utf8');
//
// 	const credentials = {
// 		key: privateKey,
// 		cert: certificate,
// 		ca: ca
// 	}
//
// 	const httpsServer = https.createServer(credentials, app);
//
// 	httpsServer.listen(securePort, () => {
// 		console.log('Listening for secure Deerman requests from port ' + securePort)
// 	})
// } catch(error) {
// 	console.log("Secure Deerman error = " + error)
// } finally {
	app.listen(port, function() {
   		console.log("Listening for Jewett's Cheese House requests from port " + port)
	})
// }
