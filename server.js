import fs from 'node:fs';
import mime from 'mime';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = createServer((req, res) => {
	if (req.url === '/') {
		req.url = 'fgta5dev.html';
	}

	var filePath = path.join(__dirname, req.url);
	if (!fs.existsSync(filePath)) {
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.end(`File ${req.url} not found`)
		return
	} else {
		var stream = fs.createReadStream(filePath)
		var mimeType = mime.getType(filePath) || 'application/octet-stream';
		res.writeHead(200, {'Content-Type': mimeType})
		stream.pipe(res)
	}
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});



