const express = require('express')
const path = require('path')
// const MongoClient = require('mongodb').MongoClinet
// import config from '../config'
// const mongo = require('mongodb').MongoClient
const assert = require('assert')
const router = express.Router()
const request = require('request-promise')
// import funds from './public/staticFiles/funds.json'
const fs = require('fs')

const url = 'mongodb://localhost:port27017/test'

// MongoClient.connect(config.mongodbUri, (err, db) => {
// 	assert.equal(null, err);

// 	mdb = db;
// })

// MongoClient.connect(url, function(err, db) {
// 	assert.equal(null, err)
// 	if(err){
// 		console.log("Unable to connect to server", err)
// 	} else {
// 		console.log("Connected correctly to server")
// 	}
// 	db.close()
// })

const app = express()

app.use('/static', express.static(__dirname + '/public'))

app.set('views', __dirname +'/views')

app.set('view engine', 'pug')

function currentVals(str) {
	let values = ''
	const options = {
		method: 'GET',
		uri: 'http://download.finance.yahoo.com/d/quotes.csv?s=%40%5EDJI,' + str + '&f=nsl1op&e=.csv'
	}
	return request(options)
	.then( (response) => {
		values = response
		console.log(response)
		return response
	})
}

function writeToFile(obj) {
	console.log(obj);
	fs.readFile('./public/staticFiles/fund_prices.json', 'utf8', function(err, data){
		let fileDat = JSON.parse(data)
		fileDat.push(obj)
		let json = JSON.stringify(fileDat);
		fs.writeFile('./public/staticFiles/fund_prices.json', json, 
			function(err){
		    if(err) throw err;
		  }
		)
	})
}

app.get('/writeData', () => writeToFile(['dkfj', 'slsl']))

function readJSONFile(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile('./public/staticFiles/funds.json', (err, data) => {
			// if (err) reject (err)
			resolve(JSON.parse(data))
		})
	})
	
    // return fs.readFile(filename, 'utf8',  (err, data) => JSON.parse(data))
  

  // .then((data) => {
  // 	//console.log(data)
  // 	dataArr = data
  // })
  

	// let fileData = []
	// fs.readFile('./public/staticFiles/funds.json', function(err, data){
	// 	// console.log(JSON.parse(data))
	// 	fileData = JSON.parse(data)

	// 	// console.log(fileData)
	// 	// res.setHeader('content-type', 'text/html')
	// 	// res.send(fileData)
	// })
	// writeToFile(fileData)
	// return fileData
}



function readAndWriteFile(reading) {

}




app.get('/writeUpdate', function(req, res){
	let val = new Promise(function (resolve, reject){
		readJSONFile('./public/staticFiles/funds.json').then(function(response){
			resolve(response)
		})
	})

	console.log(val)


	fs.readFile('./public/staticFiles/funds.json', 'utf8',  function(err, data) {
		let val = (JSON.parse(data))   
		console.log(val)
	})
		// readJSONFile('./public/staticFiles/funds.json'))

			// console.log(readJSONFile('./public/staticFiles/funds.json'))
	// readFundsFile.then((response) => writeToFile(''))
})

app.get('/postData', function(req, res){
	writeToFile({fire: 'Comey'})
})





app.get('/getData', function(req, res){
	let fileData = []
	fs.readFile('./public/staticFiles/funds.json', function(err, data){
		// console.log(JSON.parse(data))
		fileData = JSON.parse(data)
		console.log(fileData)

		res.setHeader('content-type', 'text/html')
		res.send(fileData)
	})
		writeToFile(fileData)
})




app.get('/values', function(req, res) {
	// const options = {
	// 	method: 'GET',
	// 	uri: 'http://download.finance.yahoo.com/d/quotes.csv?s=%40%5EDJI,'+'GOOG'+ '&f=nsl1op&e=.csv'
	// }
	let checkVals = new Promise((resolve, reject) => resolve(currentVals('VTSAX')))
	checkVals.then( (response) => {
		console.log(response)
		// res.end(response)
		res.send(response)
	})
	// res.redirect('/');
})

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