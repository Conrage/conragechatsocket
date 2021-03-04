const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

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
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log('listening to '+PORT);
});