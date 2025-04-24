import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import express from 'express';
import favicon from 'serve-favicon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('view engine', 'ejs');


app.use('/dist', express.static('dist'))
app.use('/images', express.static('images'))
app.use('/src', express.static('src'))
app.use('/styles', express.static('styles'))
app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.get('/', function(req, res) {
	res.render('index', {
		title: 'fgta5form Debug',
		script: 'head-script-dev.ejs',
		style: 'head-style-dev.ejs'
	});
});

app.get('/build', function(req, res) {
	res.render('index', {
		title: 'fgta5form Build',
		script: 'head-script-build.ejs',
		style: 'head-style-build.ejs'
	});
});

app.listen(3000);
console.log('Server is listening on port 3000');