export {
    authenticate,
    callback,
    logout,
}

import * as userSchema from "../models/user.js"
import * as profileSchema from "../models/profile.js"
import passport from 'passport'

function authenticate(req, res){
  passport.authenticate('google', { scope: ['profile', 'email'] })
  
}

function callback(req, res){passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google',
  })}

function logout(req, res) {  
    req.logout()
    res.redirect('/')}