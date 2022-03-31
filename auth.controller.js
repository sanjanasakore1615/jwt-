const connection = require('./mysql.connection');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
    userLogin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            connection.query(`SELECT * FROM student where Email='${req.body.Email}'`, (err, data) => {
                if (err) {
                    res.send({ error: true, message: err });
                } else {
                    console.log(data[0].password);

                    let isSame = bcrypt.compareSync(req.body.Password, data[0].password);
                    console.log(isSame);
                    
                    if (isSame) {
                      let token=jwt.sign(
                          {StudID: data[0].StudID,
                            Name: data[0].Name},
                            config.secret,
                         {algorithm:'HS256',expiresIn:6000*60});
                         res.send({ error: false, message: "login successful",token:token });
                    }
                    else {
                        res.send({ error: true, message: "login failed" })
                    }

                   
                }
            })
        }
    }
}
