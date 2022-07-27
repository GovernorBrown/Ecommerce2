import mysql from 'mysql2'

const pool = mysql.createPool({
    host:'database-1.chstqnjz9uvy.us-east-1.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password:'Marshall401968.!',
    database:'imdbmovies'   
}).promise()

const result = pool.query("SELECT * FROM notes")
console.log("CHECKING database connection..."); 
console.log(result); 