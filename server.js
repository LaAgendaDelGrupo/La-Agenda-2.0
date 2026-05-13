const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon'};

http.createServer((req, res) => {
  const url = req.url === '/' ? '/la_agenda_20_v1.2.html' : req.url.split('?')[0];
  const filePath = path.join(DIR, url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': MIME[path.extname(filePath)] || 'text/plain'});
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('La Agenda 2.0 running on port ' + PORT));
