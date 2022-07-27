import mysql from 'mysql2'

const pool = mysql.createPool({
    host:'database-3.chstqnjz9uvy.us-east-1.rds.amazonaws.com',
    port:'3307',
    user:'admin',
    password:'G0vern0r.!',
    database:'imdbmovies'   
}).promise()

const result = pool.query("SELECT * FROM notes")
console.log("CHECKING database connection..."); 
console.log(result); 