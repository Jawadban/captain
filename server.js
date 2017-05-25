const express = require('express')
const path = require('path')
// import {MongoClient} from 'mongodb'
// import assert from 'asser'
// import config from '../config'
const mongo = require('mongodb').MongoClient
const assert = require('assert')
const router = express.Router()



const url = 'mongodb://localhost:port27017/test'

// let mdb;

// MongoClient.connect(config.mongodbUri, (err, db) => {
// 	assert.equal(null, err);

	
// 	mdb = db;
// })
const app = express()

app.use('/static', express.static(__dirname + '/public'))

app.set('views', __dirname +'/views')

app.set('view engine', 'pug')

app.get('/obj', function(req, res){
	res.send({name: 'Jaw'})
})

app.get('*', function(req, res){
	  // res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
	  res.render('index')
})


app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000')
})