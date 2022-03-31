const mysql=require('mysql');
const connection=mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "studentdb"
})

connection.connect((err)=>{
    if(err){
        console.log('Error while connecting to mysql db server ',err)
    }else{
        console.log('connection established');
    }
})

module.exports=connection;