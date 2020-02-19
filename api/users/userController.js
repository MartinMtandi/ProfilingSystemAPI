const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require("./userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    error: "Record Not Found"
                })
            }
            return res.json({
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Error! Bad Request"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    error: "Error! Bad Request"
                });
            }
            if(!results){
                return res.json({
                    error: "Failed to update user"
                });
            }
            return res.json({
                data: "Updated Successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    error: "Record Not Found"
                });
            }
            return res.json({
                data: "User Deleted Successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err){
                
            }
            if(!results){
                return res.json({
                    error: "Invalid Login Credentials"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    data: "Successfully Authenticated",
                    token: jsontoken
                });
            }else{
                return res.json({
                    error: "Invalid Login Credentials"
                });
            }
        });
    }
}