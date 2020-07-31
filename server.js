const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile('./views/index.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            res.end();
        })
    }
    else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("PAGE NOT FOUND")
    }
}) 

PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Note App is Running @ PORT ${PORT}`);
})