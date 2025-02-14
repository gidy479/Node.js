import { createServer } from 'http';
import * as fs from 'fs';

const server = createServer((req, res) => {
    console.log(`Request received: ${req.url}`); // Log requests

    if (req.url === '/') {
        // Serve index.html
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Internal Server Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/services') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>We offer Web Development and Mobile App Development services</h1>');
    } else if (req.url === '/time') {
        const currentTime = new Date().toLocaleString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Current Server Time: ${currentTime}</h1>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
