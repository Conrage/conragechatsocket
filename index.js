const content = require('fs').readFileSync(__dirname + '/messageapp/src/App.vue', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer,{
  cors:{
    origin:'*',
  }
});

io.on('connection', socket => {
  console.log('connect');
  socket.on("message",(data)=>{
      console.log(data)
      io.emit("message",data)
  })
});
httpServer.listen(3000, () => {
  console.log('listening to 3000');
});