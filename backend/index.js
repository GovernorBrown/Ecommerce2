const express = require ('express');
const bodyParser = require ('body-parser');
//const dotenv= require('dotenv').config();


const mysql = require('mysql2');
const path = require("path");
const app = express();
app.use(express.static(path.resolve(__dirname, "../frontend/build")));


// Serve static files from the React frontend app
//app.use(express.static(path.join(__dirname, '../frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})*/

//CONNECTION POOLING (https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-usagenotes-j2ee-concepts-connection-pooling.html)
const pool = mysql.createPool({
    host: '127.0.0.1',
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

 //app.listen(4000,() => {console.log('listen on 4000')});
 app.listen(process.env.PORT || 4000);
