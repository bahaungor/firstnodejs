const http = require('http')
const fs = require('fs/promises');

const hostname = '127.0.0.1' // or 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
    console.log(req)
    if (req.url === '/'){
        fs.readFile(__dirname + '/index.html')
        .then(data => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(data);
        }).catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    } else {
        fs.readFile(__dirname + req.url)
        .then(data => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(data);
        }).catch(err => {
            if(err.code === 'ENOENT'){
                fs.readFile(__dirname + '/404.html')
                .then(data => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(404);
                    res.end(data);
                })
            }
        });
    }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})





// 
// const url = require("url");


// console.log(fs.readdir(".").then((asd)=>
// console.log(asd)))


// const hostname = '127.0.0.1' // or 'localhost'
// const port = 8000
// console.log("deneme")
// // Create HTTP server listens server ports & respond to client
// const server = http.createServer((req, res) => {
//   console.log(req.url.href)
//   fs.readFile(__dirname + '.' + req.url)
//     .then(contents => {
//         res.setHeader("Content-Type", "text/html");
//         res.writeHead(200);
//         res.end(contents);
//     })
//     .catch(err => {
//         res.writeHead(500);
//         res.end(err);
//         return;
//     });
// })

// // Start listening server port
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })






// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//   let filePath = '.' + req.url;
  
//   // If the request is for '/', serve 'index.html'
//   if (filePath === './') {
//     filePath = './index.html';
//   }

//   // Determine the content type based on the file extension
//   const extname = String(path.extname(filePath)).toLowerCase();
//   const contentType = {
//     '.html': 'text/html',
//     '.js': 'text/javascript',
//     '.css': 'text/css',
//     '.json': 'application/json',
//     '.png': 'image/png',
//     '.jpg': 'image/jpg',
//     '.gif': 'image/gif',
//   }[extname] || 'application/octet-stream';

//   fs.readFile(filePath, (error, content) => {
//     if (error) {
//       if (error.code === 'ENOENT') {
//         // File not found, serve the 404 page
//         fs.readFile('./404.html', (error, content) => {
//           res.writeHead(404, { 'Content-Type': 'text/html' });
//           res.end(content, 'utf-8');
//         });
//       } else {
//         // Other error, serve a generic error page
//         res.writeHead(500);
//         res.end('Server Error');
//       }
//     } else {
//       res.writeHead(200, { 'Content-Type': contentType });
//       res.end(content, 'utf-8');
//     }
//   });
// });

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
