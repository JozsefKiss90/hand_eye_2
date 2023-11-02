const http = require('http');

http.createServer((req, res)=>{
     res.writeHead(200,{'content-tyle':'text/plain'})
     res.write('<h1>hello world</h1>'); 
     res.end()
}).listen(5000, ()=> console.log('server running'))

