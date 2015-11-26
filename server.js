var express  = require('express'),
		app      = express(),
		path     = require('path'),
		mongoose = require('mongoose'),
		http		 = require('http').createServer(app),
		io       = require('socket.io').listen(http);

mongoose.connect('mongodb://localhost/rest-socket', function(err){
	if(err) throw err

	console.log("Connected to the server...");
})

var msgSchema = mongoose.Schema({
	message: String,
	time: {type: Date, default: Date.now}
})

var Chat = mongoose.model("Message", msgSchema)

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/bower_components')))

io.on('connection', function(socket){
	console.log("A user connected...")
	socket.on('send message', function(data){

		var newMsg = new Chat({message: data})

		newMsg.save(function(err){
			if (err) throw err

			io.emit('get message', data)
		})

	})

	socket.on('disconnect', function(){
		console.log('A user disconnected...');
	})
});


http.listen(8000)
console.log("Server is listening to port 8000...");
