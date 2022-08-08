/* Amplify Params - DO NOT EDIT
	API_API_APIID
	API_API_APINAME
	ENV
	FUNCTION_ECOMMERCE27F70038B_NAME
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const mysql = require('mysql2');
const path = require("path");
const cors = require ('cors');



const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.use(cors());
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


const pool = mysql.createPool({
  host:'database-3.chstqnjz9uvy.us-east-1.rds.amazonaws.com',
  port:'3307',
  user:'admin',
  password:'G0vern0r.!',
  database:'imdbmovies'   
}).promise()

const getProducts = async () =>{
  const [rows] = await pool.query ('SELECT * from products');
  return rows;
}

async function getProduct(ProductID) {
    const [rows] = await pool.query(`SELECT * from products 
          WHERE ProductID = ?
      `, [ProductID])
  return rows;
}

app.get('/products', async (req,res) =>{
  const products = await getProducts();
  console.log(products);
  res.json(products)
})

app.get('/products/:ProductID', async (req,res) =>{
  const id = req.params.ProductID
  const productSpecific = await getProduct(id);
  res.json(productSpecific);

})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
