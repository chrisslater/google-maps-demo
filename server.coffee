express = require('express')

app = express()

app.set 'view engine', 'hbs'
app.set 'views', __dirname + '/views'
app.use express.static('public')
app.use express.static('static')

app.get '/', (req, res) ->
	res.render 'index'

module.exports =
	start: (options) ->
		app.listen(3000)
