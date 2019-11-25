import express = require('express')
import { MetricsHandler } from './metrics'
const favicon = require('express-favicon');
const path = require('path');
const app = express()
const port: string = process.env.PORT || '3000'

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));
app.use(favicon(__dirname + '/favicon.svg'));

app.get('/home', (req, res) => {
  res.render('home.ejs');
})

app.get('/hello/:name', (req, res) => {
  res.render('hello.ejs', { name: req.params.name });
})

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.post('/hello', (req, res) => {
  if (req.body.name != '') {
    res.redirect('/hello/' + req.body.name);
  } else {
    res.redirect('/home');
  }
})

app.get('*', function (req, res) {
  res.redirect('/home');
});


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`Server is listening on port ${port}`)
})
