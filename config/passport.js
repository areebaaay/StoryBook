const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


//passport was passed in app.js in Passport config so we can catch it here
module.exports = function(passport)
{
    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
          },
          async (accessToken, refreshToken, profile, done) => {
              const newUser = {
                googleId : profile.id,
                displayName : profile.displayName,
                firstName : profile.name.givenName,
                lastName : profile.name.familyName,
                image : profile.photos[0].value
              }
              try{
                let user = await User.findOne({ googleId : profile.id})
                //If user exists then return null
                if (user){
                    done(null, user)
                }
                else{
                    user = await User.create(newUser)
                    done(null, user)
                }
              }
              catch(err){
                console.error(err)
              }
        }))

//this code is available in passport.js documentation
//^^ only 'function' was changes to '=>' arrow function
passport.serializeUser((user, done) => {
    done(null, user.id);
    });
          
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
    })
}
