const express = require('express')
const passport = require('passport')
const router = express.Router()


//Authenticate with Google
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


//Google auth call back
// GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google',
 {failureRedirect : '/'}),
 (req , res) => {
     res.redirect('/dashboard')
 }
 )
 //If the request fails the go to / that is login in routes/index
 //If the request is successful go to the dashboard

//Logout User
//auth/logout
router.get('/logout' , (req, res) =>
{
    req.logout()
    res.redirect('/')
})

module.exports = router