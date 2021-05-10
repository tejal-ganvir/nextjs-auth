const SignUpTemplateCopy = require('../models/SignUpModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (request, response, next) => {
    let result;
    bcrypt.hash(request.body.password, 10, function(err, hashedPass){
        if(err){
            response.json({
                status: false,
                message: 'Password hashing gone wrong'
            })
        }

        const signedUpUser = new SignUpTemplateCopy({
            fullname: request.body.fullname,
            username: request.body.username,
            email: request.body.email,
            password: hashedPass,
        })
        signedUpUser.save()
        .then(data =>{
            let token = jwt.sign({user: data}, 'verySecretValue', {expiresIn: '8h'})
            result = {
                status : true,
                token: token,
                message: 'Registration Successful!'
            }
            response.json(result)
        })
        .catch(error => {
            result = {
                'status' : false,
                'data': error,
                'message': 'Something Went Wrong'
            }
            response.json(result)
        })
    })
}

const login = (req, res, next) => {
    SignUpTemplateCopy.findOne({$or : [{email: req.body.username},{username: req.body.username}]})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err){
                    res.json({
                        status: false,
                        message: 'Password dcrypting gone wrong'
                    })
                }
                if(result){
                    let token = jwt.sign({user: user}, 'verySecretValue', {expiresIn: '8h'})
                    res.json({
                        status: true,
                        token: token,
                        message: 'Login Successful'
                    })
                }else{
                    res.json({
                        status: false,
                        message: 'Password not matched!'
                    })
                }
            })
        }else{
            res.json({
                status: false,
                message: 'No user found!'
            })
        }
    })
}

const allUsers = (req, res, next) => {
    SignUpTemplateCopy.find()
    .then(data => {
        if(data){
            res.json({
                status: true,
                data: data,
                message: 'Data fetched Successful'
            })
        }else{
            res.json({
                status: false,
                message: 'No data found!'
            })
        }
    })
}

const singleUsers = (req, res, next) => {
    if(req.query.id){
        SignUpTemplateCopy.findOne({_id : req.query.id}, {password: 0})
        .then(data => {
            if(data){
                res.json({
                    status: true,
                    data: data,
                    message: 'Data fetched Successful'
                })
            }else{
                res.json({
                    status: false,
                    message: 'No data found!'
                })
            }
        })
    }else{
        res.json({
            status: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    register,
    login,
    allUsers,
    singleUsers,
}