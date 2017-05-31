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
const axios = require('axios')

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

function readPFile(str) {
	return new Promise ((resolve, reject) => {
		fs.readFile(str, 'utf8',  function(err, data) {
			resolve(data)
		})
	})
	.then((res) => JSON.parse(res))
}

function writePFile(str, obj) {
	fs.writeFile(str, JSON.stringify(obj))
}

function currentVals(str) {
	const options = {
		method: 'GET',
		url: 'http://download.finance.yahoo.com/d/quotes.csv?s=%40%5EDJI,' + str + '&f=nsl1op&e=.csv'
	}
	return  new Promise((resolve, reject) => {
		 resolve (axios(options))
	})
}

app.get('/Step1', (request, response) => {
	fs.readFile('./public/staticFiles/funds.json', 'utf8',  function(err, data) {
		let arr = []
		let val = (JSON.parse(data))
		val.forEach((value) => {
			currentVals(value.symbol)
			.then((res) => {
				return res.data
			})
			.then((res) => {
				return (res.split(','))
			})
			.then((res) => {
				for (let v = 0; v < res.length; v ++) {
					if (!isNaN(res[v])) {
						return JSON.parse(res[v])
					}
				}
			})
			.then((res) => arr.push({symbol: value.symbol, price: res }))
			.then((res) => {
				if(res === val.length) {
					return arr	
				}
			})
			.then((res) => JSON.stringify(res))
			.then((res) => {
				fs.writeFile('./public/staticFiles/fund_prices.json', res)
			})
			.then(() => response.end('Updated prices'))
		})  
	})
})

app.get('/Step2', function(request, response){
	function getPortTotalWorth() {
		let counter = 0
		let total = 0
		let arr = []
		new Promise((resolve, request) => {
			resolve(readPFile('./public/staticFiles/portfolio.json'))
		})
		.then((res) => res.map(( dat) => {
			let port = readPFile('./public/staticFiles/funds.json')
			port.then((val) => {
				val.forEach((valFunds) => {
					if(dat.symbol === valFunds.symbol) {
						new Promise((fulfill, rej) => {
							let fundsP = readPFile('./public/staticFiles/fund_prices.json')
							fundsP
							.then((valFundPrices) => {
								valFundPrices.forEach((valFundPrice) => {
									if(valFundPrice.symbol === dat.symbol) {
										let totalSharePrice = dat.shares * valFundPrice.price
										total = total + totalSharePrice
										response.send(valFunds.name +':'+ dat.shares + ' shares at $' + valFundPrice.price + 
											' ea. -- $' + totalSharePrice.toFixed(2))
										if(counter === 5) {
											response.send('Total: $', total.toFixed(2)) 
											writePFile('./public/staticFiles/combinedData.json', arr)
										} else {
											counter ++
											arr.push({"symbol": valFundPrice.symbol, "name": valFunds.name, 
												"shares": dat.shares, "price": valFundPrice.price, 
												"totalPrice": totalSharePrice, "assetClass": valFunds.assetClass})
										}
									}
								})
							})
						})
					}
				})
			})
		}))
	}

	getPortTotalWorth()

})

app.get('*', function(req, res){
	  res.render('index')
})


app.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000')
})