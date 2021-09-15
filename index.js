import express from 'express';
import path from "path";
import { requestTime, logger } from './middlewares.js';
import serverRoutes from './routes/servers.js'

const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('templates'));

app.use(express.static(path.resolve('static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestTime);
app.use(logger);

app.use(serverRoutes)

app.get('/', (req, res) => {
  res.render('index', { title: 'Main page', active: 'main' });
});

app.get('/features', (req, res) => {
  res.render('features', { title: 'Features page', active: 'feature', list: 'servers' });
});

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>');
//   res.sendFile(path.resolve('static', 'index.ejs'));
// });
//
// app.get('/download', (req, res) => {
//   console.log(req.requestTime);
//   res.download(path.resolve('static', 'index.ejs'));
// });

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
