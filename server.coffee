express = require('express')

app = express()

app.use express.static('views')
app.use express.static('public')
app.use express.static('static')

module.exports =
	start: (options) ->
		app.listen(3000)
