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
router.post("/", (req, res) => {
	let obj = {
    	"p_id": req.body.p_id
	}
	//connect to mongodb
	mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
 	               res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                    	console.log("Data deleted ")
                    	res.json({ 'delete': 'success' })
                    } else {
                    	console.log("Data Not deleted ")
                    	res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
        	})
    	}
	})
})
//Delete product from cart
router.post("/deleteCart", (req, res) => {
	let obj = {
    	"p_id": req.body.p_id,
    	"u_name": req.body.u_name
	}
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('cart').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                    	console.log(`Cart data from ${obj.u_name} deleted`)
                    	res.json({ 'cartDelete': 'success' })
                    }
                    else {
                    	console.log('Cart Data Not deleted')
                    	res.json({ 'cartDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
    	}
	})
})
router.post("/deleteUser", (req, res) => {
	let obj = {
    	"userid": req.body.userid,
    	"u_name": req.body.u_name,
	}
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('users').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'userDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                    	console.log(`user data from ${obj.u_name} deleted`)
                    	res.json({ 'userDelete': 'success' })
                    }
                    else {
                    	console.log('User Data Not deleted')
                    	res.json({ 'userDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
    	}
	})
})

//export router
module.exports = router
