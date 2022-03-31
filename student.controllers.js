const connection = require('./mysql.connection');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
module.exports = {
    getAllStudents: (req, res, next) => {
        connection.query(`SELECT StudID, Name, Email, Mobile, Age FROM student  where StudID=${req.user.StudID}`, (err, data) => {
            if (err) {
                res.send({ error: true, message: err });
            } else {
                console.log(req.user);
                res.send({ error: false, info: data });
            }
        })
    },
    findById: (req, res, next) => {
        connection.query(`SELECT StudID, Name, Email, Mobile, Age FROM student  where StudID=${req.params.id}`, (err, data) => {
            if (err) {
                res.send({ error: true, message: err });
            } else {
                res.send({ error: false, info: data });
            }
        })
    },
    deleteById: (req, res, next) => {
        connection.query(`delete FROM student where StudID=${req.params.id}`, (err, data) => {
            if (err) {
                res.send({ error: true, message: err });
            } else {
                if (data.affectedRows > 0) {
                    res.send({ error: false, message: "deleted" });
                } else {
                    res.send({ error: false, message: "record not found" });
                }

            }
        })
    },
    updateMobile: (req, res, next) => {
        connection.query(`UPDATE student SET Mobile='${req.body.Mobile}' where StudID=${req.params.id}`, (err, data) => {
            if (err) {
                res.send({ error: true, message: err });
            } else {
                if (data.affectedRows > 0) {
                    res.send({ error: false, message: "updated" });
                } else {
                    res.send({ error: false, message: "record not found" });
                }

            }
        })
    },

    createStudent: async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            // const salt =await bcrypt.genSalt(10);
            // const hashPasswowrd =await bcrypt.hash(req.body.password, salt);
            // let isSame=bcrypt.compareSync(req.body.Password,data[0].password)

            const salt = bcrypt.genSaltSync(10);
            const hashPasswowrd = bcrypt.hashSync(req.body.password, salt);

            connection.query(`INSERT INTO student(StudID, Name, Email, Mobile, Age, password) VALUES
        (0,'${req.body.Name}','${req.body.Email}','${req.body.Mobile}',${req.body.Age},'${hashPasswowrd}')`
                , (err, data) => {
                    if (err) {
                        res.send({ error: true, message: err });
                    } else {
                        if (data.affectedRows > 0) {
                            res.send({ error: false, message: "inserted" });
                        } else {
                            res.send({ error: false, message: "record not inserted" });
                        }

                    }
                })
        }

    }
}