import { createServer } from 'http';
import { readFile } from 'fs';
import * as path from 'path';

const PORT = process.argv[2];

const whenIncomingRequest = (request, response) => {
  console.log('Request URL: ', request.url);

  let filePath = '.' + request.url;
  if (filePath === './') {
    filePath = './noodle-app-css/home.html';
  }

  let extName = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

  let contentType = mimeTypes[extName] || 'application/octet-stream';

  readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        readFile("./noodle-app-css/404.html", (err, content) => {
          response.writeHead(404, { 'Content-Type' : 'text/html' });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check site admin for error: ' + err.code + '..\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
   
  });
};

createServer(whenIncomingRequest).listen(PORT);