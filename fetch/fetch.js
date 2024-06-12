//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//database name
let dbName = 'miniprj'
//create restapi
router.get("/", (req, res) => {
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
  	      console.log('Error in connection')
    	else {
        	let db = conn.db(dbName)
            db.collection('products').find().toArray((err, array) => {
                if (err)
                    console.log('Error:- ', err)
                else {
                    console.log('Data Sent')
                    res.json(array)
                    conn.close()
                }
        	})
    	}
	})
})
 
//User login Authentication
router.post('/auth', (req, res) => {
	let u_name = req.body.u_name
	let upwd = req.body.upwd
	let obj = { u_name, upwd }
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                    	res.json({ 'auth': 'success', 'user': u_name })
                    else
                    	res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
        	})
    	}
	})
})

//Fetch cart data
router.post("/fetchCart", (req, res) => {
	let u_name = req.body.u_name
	let obj = { u_name }
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart response for ${obj.u_name} sent`)
                    conn.close()
                }
        	})
    	}
	})
})
 
//export router
module.exports = router
