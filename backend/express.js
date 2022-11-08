import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import { client } from './db/client.js';
import { apiRouter } from './api/index.js';
import path from 'path';
import { Provider } from 'react-redux';
/* import App from '../frontend/src/ui/components/App.js'; */

dotenv.config();

const PORT = process.env.PORT || 3000;
export const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(morgan('dev'));
/* server.use(express.static('public')); */
server.use(express.static(path.join('../frontend/public/index.html', 'build')));


server.use((req, _res, next) => {
	console.log('<____Body Logger START____>');
	console.log(req.body);
	console.log('<_____Body Logger END_____>');
	next();
});
server.use('/', apiRouter);

server.get('/*', function(req,res) {
	res.sendFile(path.join('../frontend/public/index.html', 'build', 'index.html'));
});

server.listen(PORT, async () => {
	console.log(`Server is running on ${PORT}!`);
	try {
		await client.connect();
		console.log('Database is open for business!');
	} catch (error) {
		console.error('Database is closed for repairs!', error);
	}
});
