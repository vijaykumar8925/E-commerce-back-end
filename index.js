

const mysql = require('mysql');

const express = require('express');

let app = express();

let cors = require('cors')

let bodyParser = require('body-parser')

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

require('dotenv').config()

const connection = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database,
});

connection.connect(connection,(err) => {
    if(err) {
        console.log(err)
    }else{
        console.log('databae connected')
    }
})

app.listen(5000,(error) => {
    if(error){
        console.log(error)
    }else{
        console.log('app listing on port')
    }
})

app.post('/register',(req,res) => {
    let sqlQuery = `INSERT INTO  register_form (username,email,dob,mobile_no,additional_mobile,address,passwords,is_Active,is_Edited,is_Createdon)
    VALUES('${req.body.userName}','${req.body.email}','${req.body.dob}','${req.body.phone}','${req.body.phone1}','${req.body.address}','${req.body.password}',1,1,NULL);`;
    connection.query(sqlQuery,(err,result) => {
        if(err){
            res.send({message : 'Email Already Registered'})
        }else{
            res.send({message : 'Successfully Registered'})
        }
    })
})

app.post('/signin' ,  (req,res) => {
    console.log(req.body.email)
    let sqlQuery = `SELECT * FROM register_form WHERE email = '${req.body.email}';`;
    connection.query(sqlQuery,(err,result) => {
        console.log(result,err)
        if(result.length == 0){
            res.send({message:`Username doesn't exisit please Register First`})
        }else{
            async function passwordCheck () {
                for(let val of result){
                    let values = await val.passwords;
                    if(values != req.body.password){
                        res.send({message:'Incorrect Password'})
                    }else{
                        res.send({message : 'Succesful Login'})
                    }
                  }
            }
            passwordCheck()
        }
    })
})






// const ueIDB = ``

// const connection = mysql.createConnection(`mysql://root:GfGeg3122a4a13Aa5GdfecfA5CFe-ECd@viaduct.proxy.rlwy.net:57705/railway`)