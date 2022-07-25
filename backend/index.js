const express = require ('express');
const bodyParser = require ('body-parser');
//const dotenv= require('dotenv').config();
const app = express();

const mysql = require('mysql2');

//CONNECTION POOLING (https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-usagenotes-j2ee-concepts-connection-pooling.html)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'G0vern0r.!', 
    database: 'imdbmovies',
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

 app.listen(4000,() => {console.log('listen on 4000')});
