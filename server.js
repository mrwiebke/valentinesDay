// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const port = 3000;
// const hostname = '127.0.0.1'; // or any other IP address or hostname


// const dataFilePath = path.join(__dirname, 'data.json');

// let appData = {};

// // Read initial data from data.json
// fs.readFile(dataFilePath, (err, data) => {
//     if (!err) {
//         try {
//             appData = JSON.parse(data);
//         } catch (parseError) {
//             console.error('Error parsing data.json:', parseError);
//         }
//     } else {
//         console.error('Error reading data.json:', err);
//     }
// });

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         // Serve HTML page with initial data
//         fs.readFile(path.join(__dirname, 'index.html'), (err, html) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('Internal Server Error');
//                 return;
//             }

//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(html);
//         });
//     } else if (req.url === '/valentines.js') {
//         // Serve JavaScript file
//         fs.readFile(path.join(__dirname, 'valentines.js'), (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('Internal Server Error');
//                 return;
//             }
//             res.writeHead(200, { 'Content-Type': 'application/javascript' });
//             res.end(data);
//         });
//     } else if (req.url === '/data.json' && req.method === 'GET') {
//         // Serve app data
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(appData));
//     } else if (req.url === '/data.json' && req.method === 'POST') {
//         // Handle updates to app data
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString(); // convert Buffer to string
//         });
//         req.on('end', () => {
//             try {
//                 const newData = JSON.parse(body);
//                 // Update app data
//                 appData = newData;
//                 // Write updated data to data.json
//                 fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), err => {
//                     if (err) {
//                         console.error('Error writing data.json:', err);
//                     }
//                 });
//                 res.writeHead(200, { 'Content-Type': 'text/plain' });
//                 res.end('Data updated successfully');
//             } catch (parseError) {
//                 console.error('Error parsing JSON:', parseError);
//                 res.writeHead(400, { 'Content-Type': 'text/plain' });
//                 res.end('Error parsing JSON');
//             }
//         });
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     }
// });

// // Start the server
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
